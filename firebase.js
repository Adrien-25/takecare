// Import necessary functions from the 'firebase/app' and 'firebase/storage' modules
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

// Load environment variables from the '.env' file
require('dotenv').config();

// Configuration object containing Firebase API keys and settings
const firebaseConfig = {
apiKey: process.env.FIREBASE_API_KEY,
authDomain: process.env.FIREBASE_AUTH_DOMAIN,
projectId: process.env.FIREBASE_PROJECT_ID,
storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
appId: process.env.FIREBASE_APP_ID  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase using the configuration object
export const storage = getStorage(app);




