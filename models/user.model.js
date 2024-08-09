import mongoose from "mongoose"
const Schema = mongoose.Schema;

const userSchema = new Schema({
  role: {
    type: String,
    enum: ['parent', 'teacher', 'admin'],
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true }); // Moved timestamps here

export default mongoose.model('User', userSchema);