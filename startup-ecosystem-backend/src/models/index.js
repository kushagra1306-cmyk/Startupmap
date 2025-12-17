const User = require('./User');
const Business = require('./Business');
const CollaborationRequest = require('./CollaborationRequest');
const Notification = require('./Notification');

// User has many Businesses
User.hasMany(Business, { foreignKey: 'ownerId', as: 'businesses' });
Business.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

// Business has many collaboration requests (as sender)
Business.hasMany(CollaborationRequest, { 
  foreignKey: 'senderBusinessId', 
  as: 'sentRequests' 
});

// Business has many collaboration requests (as receiver)
Business.hasMany(CollaborationRequest, { 
  foreignKey: 'receiverBusinessId', 
  as: 'receivedRequests' 
});

CollaborationRequest.belongsTo(Business, { 
  foreignKey: 'senderBusinessId', 
  as: 'senderBusiness' 
});

CollaborationRequest.belongsTo(Business, { 
  foreignKey: 'receiverBusinessId', 
  as: 'receiverBusiness' 
});

// User has many Notifications
User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications' });
Notification.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
  User,
  Business,
  CollaborationRequest,
  Notification
};