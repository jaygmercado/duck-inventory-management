import mongoose, { ConnectionStates } from 'mongoose';
import sendEmail from './sendEmail';

const connection: { isConnected: ConnectionStates | null } = { isConnected: null };

const connectMongo = async () => {
  if (connection.isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || '');
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    await sendEmail(
      ['mrg2023@dlsud.edu.ph'],
      'MongoDB Connection Error',
      'Error encountered when connecting to MongoDB.',
    );
  }
};

export default connectMongo;
