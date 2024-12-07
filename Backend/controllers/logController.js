import Log from '../models/Log.js';

// Fetch all logs
export const getLogs = async (req, res) => {
  try {
    const logs = await Log.find().populate('user', 'username email').sort({ createdAt: -1 });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch logs', error });
  }
};

// Fetch latest logs
export const getLatestLogs = async (req, res) => {
  try {
    const logs = await Log.find().populate('user', 'username email').sort({ createdAt: -1 }).limit(10);
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch logs', error });
  }
};

// Add a log entry
export const addLog = async (action, userId, details) => {
  try {
    await Log.create({
      action,
      user: userId,
      details,
    });
  } catch (error) {
    console.error('Failed to create log:', error.message);
  }
};
