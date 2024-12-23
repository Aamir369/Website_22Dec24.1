// const firebaseConfig = {
// 	  apiKey: process.env.NEXT_PUBLIC_API_KEY,
// 	  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
// 	  databaseURL: process.env.NEXT_PUBLIC_DB_URL,
// 	  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
// 	  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
// 	  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
// 	  appId: process.env.NEXT_PUBLIC_APP_ID,
// 	  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID, 
//   };

const firebaseConfig = {
	  apiKey: process.env.API_KEY,
	  authDomain: process.env.AUTH_DOMAIN,
	  databaseURL: process.env.DB_URL,
	  projectId: process.env.PROJECT_ID,
	  storageBucket: process.env.STORAGE_BUCKET,
	  messagingSenderId: process.env.MESSAGING_SENDER_ID,
	  appId: process.env.APP_ID,
	  measurementId: process.env.MEASUREMENT_ID, 
  };
  
  export { firebaseConfig };
