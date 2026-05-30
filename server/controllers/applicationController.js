const Application = require('../models/Application');
const Job = require('../models/Job');

// @desc    Apply to a job
// @route   POST /api/applications/:jobId
// @access  Private (Seeker)
exports.applyToJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ success: false, message: `Job not found with id of ${jobId}` });
    }

    // Check if user already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      seeker: req.user.id
    });

    if (existingApplication) {
      return res.status(400).json({ success: false, message: 'You have already applied to this job' });
    }

    const application = await Application.create({
      job: jobId,
      seeker: req.user.id,
      coverLetter: req.body.coverLetter,
      resumeUrl: req.body.resumeUrl || req.user.resume?.url
    });

    res.status(201).json({
      success: true,
      data: application
    });
  } catch (error) {
    if(error.code === 11000) {
      return res.status(400).json({ success: false, message: 'You have already applied to this job' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get seeker's applications
// @route   GET /api/applications/my
// @access  Private (Seeker)
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ seeker: req.user.id })
      .populate({
        path: 'job',
        select: 'title company location type salary isActive'
      })
      .sort('-appliedAt');

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get applicants for a specific job
// @route   GET /api/applications/job/:jobId
// @access  Private (Employer)
exports.getJobApplicants = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ success: false, message: `Job not found with id of ${req.params.jobId}` });
    }

    // Make sure user is job owner
    if (job.employer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to access this route' });
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate({
        path: 'seeker',
        select: 'name email avatar skills location resume'
      })
      .sort('-appliedAt');

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update application status
// @route   PUT /api/applications/:id/status
// @access  Private (Employer)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'reviewed', 'shortlisted', 'rejected', 'accepted'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const application = await Application.findById(req.params.id).populate('job');

    if (!application) {
      return res.status(404).json({ success: false, message: `Application not found` });
    }

    // Make sure user is job owner
    if (application.job.employer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this application' });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      success: true,
      data: application
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
