import Setting from '../models/Setting.js';

// Fetch all settings
export const getSettings = async (req, res) => {
  try {
    const settings = await Setting.find();
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch settings', error });
  }
};

// Get a specific setting by key
export const getSettingByKey = async (req, res) => {
  const { key } = req.params;

  try {
    const setting = await Setting.findOne({ key });
    if (!setting) {
      return res.status(404).json({ message: 'Setting not found' });
    }

    res.status(200).json(setting);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch setting', error });
  }
};

// Create or update a setting
export const upsertSetting = async (req, res) => {
  const { key, value } = req.body;

  try {
    const setting = await Setting.findOneAndUpdate(
      { key },
      { value },
      { new: true, upsert: true } // Create if not exists, update if exists
    );

    res.status(200).json({message: 'Settings Updated',setting});
  } catch (error) {
    res.status(500).json({ message: 'Failed to save setting', error });
  }
};

// Delete a setting
export const deleteSetting = async (req, res) => {
  const { key } = req.params;

  try {
    const setting = await Setting.findOneAndDelete({ key });
    if (!setting) {
      return res.status(404).json({ message: 'Setting not found' });
    }

    res.status(200).json({ message: 'Setting deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete setting', error });
  }
};
