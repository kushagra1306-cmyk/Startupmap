const { CollaborationRequest, Business, Notification, User } = require('../models');
const { Op } = require('sequelize');

exports.sendRequest = async (req, res, next) => {
  try {
    const { receiverBusinessId, requestType, message } = req.body;
    const senderBusinessId = req.body.senderBusinessId;

    // Verify sender owns the business
    const senderBusiness = await Business.findOne({
      where: { id: senderBusinessId, ownerId: req.userId }
    });

    if (!senderBusiness) {
      return res.status(403).json({ error: 'You do not own this business' });
    }

    // Check receiver business exists
    const receiverBusiness = await Business.findByPk(receiverBusinessId);
    if (!receiverBusiness) {
      return res.status(404).json({ error: 'Receiver business not found' });
    }

    // Check for duplicate pending request
    const existingRequest = await CollaborationRequest.findOne({
      where: {
        senderBusinessId,
        receiverBusinessId,
        requestType,
        status: 'PENDING'
      }
    });

    if (existingRequest) {
      return res.status(400).json({ error: 'Pending request already exists for this type' });
    }

    // Create collaboration request
    const collaborationRequest = await CollaborationRequest.create({
      senderBusinessId,
      receiverBusinessId,
      requestType,
      message,
      status: 'PENDING'
    });

    // Create notification for receiver
    await Notification.create({
      userId: receiverBusiness.ownerId,
      type: 'COLLAB_REQUEST',
      message: `${senderBusiness.name} sent you a ${requestType} collaboration request`,
      isRead: false
    });

    res.status(201).json({
      message: 'Collaboration request sent successfully',
      request: collaborationRequest
    });
  } catch (error) {
    next(error);
  }
};

exports.respondToRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'ACCEPTED' or 'REJECTED'

    if (!['ACCEPTED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const request = await CollaborationRequest.findByPk(id, {
      include: [
        { model: Business, as: 'senderBusiness' },
        { model: Business, as: 'receiverBusiness' }
      ]
    });

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    // Verify user owns receiver business
    if (request.receiverBusiness.ownerId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    if (request.status !== 'PENDING') {
      return res.status(400).json({ error: 'Request already processed' });
    }

    await request.update({ status });

    // Create notification for sender
    await Notification.create({
      userId: request.senderBusiness.ownerId,
      type: status,
      message: `${request.receiverBusiness.name} ${status.toLowerCase()} your ${request.requestType} request`,
      isRead: false
    });

    res.json({
      message: `Request ${status.toLowerCase()} successfully`,
      request
    });
  } catch (error) {
    next(error);
  }
};

exports.getSentRequests = async (req, res, next) => {
  try {
    const businesses = await Business.findAll({
      where: { ownerId: req.userId },
      attributes: ['id']
    });

    const businessIds = businesses.map(b => b.id);

    const requests = await CollaborationRequest.findAll({
      where: { senderBusinessId: businessIds },
      include: [
        { model: Business, as: 'senderBusiness', attributes: ['id', 'name'] },
        { model: Business, as: 'receiverBusiness', attributes: ['id', 'name'] }
      ],
      order: [['created_at', 'DESC']]
    });

    res.json({ requests });
  } catch (error) {
    next(error);
  }
};

exports.getReceivedRequests = async (req, res, next) => {
  try {
    const businesses = await Business.findAll({
      where: { ownerId: req.userId },
      attributes: ['id']
    });

    const businessIds = businesses.map(b => b.id);

    const requests = await CollaborationRequest.findAll({
      where: { receiverBusinessId: businessIds },
      include: [
        { model: Business, as: 'senderBusiness', attributes: ['id', 'name'] },
        { model: Business, as: 'receiverBusiness', attributes: ['id', 'name'] }
      ],
      order: [['created_at', 'DESC']]
    });

    res.json({ requests });
  } catch (error) {
    next(error);
  }
};