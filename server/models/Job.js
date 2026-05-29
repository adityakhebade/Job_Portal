const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a job title'],
    trim: true,
    maxlength: [100, 'Title can not be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [5000, 'Description can not be more than 5000 characters']
  },
  requirements: {
    type: String,
    required: [true, 'Please add requirements']
  },
  company: {
    type: String,
    required: [true, 'Please add a company name']
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  salary: {
    min: {
      type: Number,
      required: [true, 'Please add a minimum salary']
    },
    max: {
      type: Number,
      required: [true, 'Please add a maximum salary']
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'remote', 'contract', 'internship'],
    required: [true, 'Please specify job type']
  },
  category: {
    type: String,
    required: [true, 'Please add a category']
  },
  tags: [String],
  employer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  deadline: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', JobSchema);
