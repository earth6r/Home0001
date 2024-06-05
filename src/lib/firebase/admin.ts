import admin from 'firebase-admin'

// TODO: test if this works
export const initializeAdmin = () => {
  const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY as string)
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.PROJECT_ID,
    })
  }
}
