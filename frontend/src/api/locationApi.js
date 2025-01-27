import axios from 'axios';

const API_URL = 'https://google-maps-crud-backend.onrender.com/api/locations'; // change this with your Backend API URL

export const getLocations = async () => axios.get(API_URL);
export const addLocation = async (data) => axios.post(API_URL, data);
export const updateLocation = async (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteLocation = async (id) => axios.delete(`${API_URL}/${id}`);
