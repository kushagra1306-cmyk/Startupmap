const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const CollaborationRequest = sequelize.define('CollaborationRequest', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  senderBusinessId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'sender_business_id'
  },
  receiverBusinessId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'receiver_business_id'
  },
  requestType: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'request_type'
  },
  message: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'ACCEPTED', 'REJECTED'),
    defaultValue: 'PENDING'
  }
}, {
  tableName: 'collaboration_requests',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = CollaborationRequest;