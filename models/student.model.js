import mongoose from "mongoose"
const Schema = mongoose.Schema;

// Define the Student schema
const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  class: {
    type: Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  age: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  parentIds: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  // You can add more fields here as needed
}, {
  timestamps: true
});

export default mongoose.model('Student', studentSchema);
