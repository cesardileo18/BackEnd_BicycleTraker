import * as ecobiciService from '../services/ecobici.services.js'

export const getStationStatus = async (req, res) => {
  try {
    const data = await ecobiciService.getStationStatus();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};
export const getStationInformation = async (req, res) => {
  try {
    const data = await ecobiciService.getStationInformation();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};