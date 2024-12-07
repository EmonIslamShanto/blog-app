import Blog from '../models/Blog.js';
import Service from '../models/Service.js';
import Team from '../models/Team.js';
import Log from '../models/Log.js';
import Setting from '../models/Setting.js';

// Get dashboard summary
export const getDashboardSummary = async (req, res) => {
  try {
    const totalBlogs = await Blog.countDocuments();
    const totalServices = await Service.countDocuments();
    const totalTeams = await Team.countDocuments();
    const totalLogs = await Log.countDocuments();
    const totalSettings = await Setting.countDocuments();


    // Get last 7 days summary
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);
    const last7DaysBlogs = await Blog.countDocuments({ createdAt: { $gte: last7Days } });
    const last7DaysServices = await Service.countDocuments({ createdAt: { $gte: last7Days } });
    const last7DaysTeams = await Team.countDocuments({ createdAt: { $gte: last7Days } });
    const last7DaysLogs = await Log.countDocuments({ createdAt: { $gte: last7Days } });
    const last7DaysSettings = await Setting.countDocuments({ createdAt: { $gte: last7Days } });


    res.status(200).json({
      blogs: totalBlogs,
      services: totalServices,
      teams: totalTeams,
      logs: totalLogs,
      settings: totalSettings,
      last7Days: {
        blogs: last7DaysBlogs,
        services: last7DaysServices,
        teams: last7DaysTeams,
        logs: last7DaysLogs,
        settings: last7DaysSettings
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch dashboard summary', error });
  }
};

// Search data
export const searchData = async (req, res) => {
  const { query, type } = req.query;

  try {
    let results = [];
    if (type === 'blog') {
      results = await Blog.find({ title: new RegExp(query, 'i') });
    } else if (type === 'service') {
      results = await Service.find({ name: new RegExp(query, 'i') });
    } else if (type === 'team') {
      results = await Team.find({ name: new RegExp(query, 'i') });
    } else if (type === 'log') {
      results = await Log.find({ title: new RegExp(query, 'i' ) });
    } else if (type === 'setting') {
      results = await Setting.find({ title: new RegExp(query, 'i' ) });
    } else {
      return res.status(400).json({ message: 'Invalid search type' });
    } 

    if (results.length === 0) {
      return res.status(404).json({ message: 'No data found' });
    }

    return res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Failed to search data', error });
  }
};
