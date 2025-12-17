const { Business } = require('../models');

exports.createBusiness = async (req, res, next) => {
  try {
    const { name, category, description, city, latitude, longitude, contactEmail } = req.body;

    const business = await Business.create({
      name,
      category,
      description,
      city,
      latitude,
      longitude,
      contactEmail,
      ownerId: req.userId,
      status: 'NEW'
    });

    res.status(201).json({
      message: 'Business created successfully',
      business
    });
  } catch (error) {
    next(error);
  }
};

exports.getMyBusinesses = async (req, res, next) => {
  try {
    const businesses = await Business.findAll({
      where: { ownerId: req.userId },
      order: [['created_at', 'DESC']]
    });

    res.json({ businesses });
  } catch (error) {
    next(error);
  }
};

exports.getAllBusinesses = async (req, res, next) => {
  try {
    const { category, city } = req.query;
    
    const where = { status: 'VERIFIED' };
    if (category) where.category = category;
    if (city) where.city = city;

    const businesses = await Business.findAll({
      where,
      attributes: ['id', 'name', 'category', 'description', 'city', 'latitude', 'longitude', 'contactEmail'],
      order: [['created_at', 'DESC']]
    });

    res.json({ businesses });
  } catch (error) {
    next(error);
  }
};

exports.getBusinessById = async (req, res, next) => {
  try {
    const business = await Business.findByPk(req.params.id, {
      include: [{
        model: require('./User'),
        as: 'owner',
        attributes: ['id', 'name']
      }]
    });

    if (!business) {
      return res.status(404).json({ error: 'Business not found' });
    }

    res.json({ business });
  } catch (error) {
    next(error);
  }
};

exports.updateBusiness = async (req, res, next) => {
  try {
    const business = await Business.findOne({
      where: { id: req.params.id, ownerId: req.userId }
    });

    if (!business) {
      return res.status(404).json({ error: 'Business not found or unauthorized' });
    }

    const { name, category, description, city, latitude, longitude, contactEmail } = req.body;

    await business.update({
      name,
      category,
      description,
      city,
      latitude,
      longitude,
      contactEmail
    });

    res.json({
      message: 'Business updated successfully',
      business
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteBusiness = async (req, res, next) => {
  try {
    const business = await Business.findOne({
      where: { id: req.params.id, ownerId: req.userId }
    });

    if (!business) {
      return res.status(404).json({ error: 'Business not found or unauthorized' });
    }

    await business.destroy();

    res.json({ message: 'Business deleted successfully' });
  } catch (error) {
    next(error);
  }
};