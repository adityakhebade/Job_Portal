const express = require('express');
const {
  getUsers,
  deleteUser,
  getAllJobs,
  getStats
} = require('../controllers/adminController');
const { deleteJob } = require('../controllers/jobController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);
router.use(authorize('admin'));

router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);

router.get('/jobs', getAllJobs);
router.delete('/jobs/:id', deleteJob);

router.get('/stats', getStats);

module.exports = router;
