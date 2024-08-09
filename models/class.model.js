import mongoose from "mongoose"
const Schema = mongoose.Schema;

// Define the Class schema
const classSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  studentIds: [{
    type: Schema.Types.ObjectId,
    ref: 'Student'
  }],
  parentIds: [{
    type: Schema.Types.ObjectId,
    ref: 'Parent'
  }],
  classcode: {
    type: String,
    required: true,
    unique: true
  },
  
  
}, {timestamps: true});

export default mongoose.model('Class', classSchema); 

