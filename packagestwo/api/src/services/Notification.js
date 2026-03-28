// services/notificationService.js

const Notification = require("../models/Notification");

class NotificationService {
  // CREATE NOTIFICATON
  async createNotification(data) {
    return await Notification.create(data);
  }


  //GET NOTIFICATION 
  async getNotifications(id) {
    const data = await Notification.find(id)
      .sort({ createdAt: -1 })  
    return {
      data
    };
  }

  //MARK AS READ 
  async markOneAsRead(id) {
    return await Notification.findByIdAndUpdate(id, {
      isRead: true,
    });
  }

  //MARK ALL READ 
  async markAllAsRead(vendorId) {
    return await Notification.updateMany(
      { vendorId, isRead: false },
      { $set: { isRead: true } }
    );
  }

  // COUNT NOTIFICATIONS
  async countNotifications(vendorId){
    const total = await Notification.countDocuments({
      vendorId:vendorId,
      isRead:false
    });
    return total;
  }
}



module.exports = new NotificationService();