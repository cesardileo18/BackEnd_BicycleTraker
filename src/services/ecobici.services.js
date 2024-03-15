import fetch from 'node-fetch';
import env from '../config/enviroment.config.js'
export const getStationStatus = async (req, res) => {
    const url = `https://apitransporte.buenosaires.gob.ar/ecobici/gbfs/stationStatus?client_id=${env.clientId}&client_secret=${env.clientSecret}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Internal server error');
    }
};

export const getStationInformation = async (req, res) => {
    const url = `https://apitransporte.buenosaires.gob.ar/ecobici/gbfs/stationInformation?client_id=${env.clientId}&client_secret=${env.clientSecret}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Internal server error');
    }
};
