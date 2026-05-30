const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.ObjectId,
    ref: 'Job',
    required: true
  },
  seeker: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  coverLetter: {
    type: String,
    required: [true, 'Please add a cover letter']
  },
  resumeUrl: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'shortlisted', 'rejected', 'accepted'],
    default: 'pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent user from applying to the same job twice
ApplicationSchema.index({ job: 1, seeker: 1 }, { unique: true });

module.exports = mongoose.model('Application', ApplicationSchema);
