interface Notification {
  empfaengerId: string;
  titel: string;
  text: string;
  zeitpunkt: Date;
}

const notifications: Notification[] = [];

export const sendNotificationToUser = async (data: Omit<Notification, 'zeitpunkt'>) => {
  const newNotification: Notification = {
    ...data,
    zeitpunkt: new Date()
  };
  notifications.push(newNotification);
  return newNotification;
};

export const getUserNotifications = async () => {
  return notifications;
};