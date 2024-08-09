import mongoose from "mongoose"
const Schema = mongoose.Schema;

// Define the Feed and Announcement schema
const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  targetClassIds: [{
    type: Schema.Types.ObjectId,
    ref: 'Class'
  }],
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Post', postSchema);
