const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort('-createdAt');
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Delete associated jobs if employer
    if (user.role === 'employer') {
      await Job.deleteMany({ employer: user._id });
    }

    // Delete associated applications if seeker
    if (user.role === 'seeker') {
      await Application.deleteMany({ seeker: user._id });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all jobs
// @route   GET /api/admin/jobs
// @access  Private/Admin
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({}).populate({
      path: 'employer',
      select: 'name company email'
    }).sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const seekers = await User.countDocuments({ role: 'seeker' });
    const employers = await User.countDocuments({ role: 'employer' });
    const totalJobs = await Job.countDocuments();
    const activeJobs = await Job.countDocuments({ isActive: true });
    const totalApplications = await Application.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        users: { total: totalUsers, seekers, employers },
        jobs: { total: totalJobs, active: activeJobs },
        applications: totalApplications
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
