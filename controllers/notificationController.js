import admin from 'firebase-admin';
import Notification from '../models/notificationModel.js';

export const sendNotification = async (req, res) => {
  const { token, title, body } = req.body;

  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: token,
  };

  try {
    await admin.messaging().send(message);

    const notification = new Notification({ token, title, body });
    await notification.save();

    res.status(200).send('Notification sent and saved successfully');
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Error sending notification');
  }
};
