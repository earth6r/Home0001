import admin from 'firebase-admin'

// server side calls only
export const initializeAdmin = () => {
  // Parse Firebase configuration from environment variables
  const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY as string)

  // Check if Firebase Admin SDK is already initialized
  if (!admin.apps.length) {
    // Initialize Firebase app with the parsed configuration
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.PROJECT_ID,
    })
  }
}
