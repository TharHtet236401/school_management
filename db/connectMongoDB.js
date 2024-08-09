import mongoose from 'mongoose';
import dotenv from 'dotenv';

const connectToMongoDB = async () => {
    try {
       await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB}`, {});
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

export default connectToMongoDB;