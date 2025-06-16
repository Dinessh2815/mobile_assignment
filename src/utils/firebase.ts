import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: 'proactively-ccf2d',
  storageBucket: 'proactively-ccf2d.firebasestorage.app',
  // The Firebase JavaScript SDK automatically reads the configuration 
  // from the google-services.json file for Android and 
  // GoogleService-Info.plist for iOS when running in those platforms
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase Messaging instance
export const messaging = getMessaging(app);

export default app;
