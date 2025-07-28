interface Subscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

let subscriptions: Subscription[] = [];

export const saveSubscription = (sub: Subscription) => {
  subscriptions.push(sub);
};

export const sendPushNotification = async (title: string, message: string) => {
  console.log(`[Push] ${title}: ${message}`);
  // Hier könntest du mit web-push echte Nachrichten senden
};