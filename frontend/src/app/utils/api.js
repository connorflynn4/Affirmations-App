import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Fetch affirmations
export const getAffirmations = async () => {
  const response = await axiosInstance.get('/affirmations');
  return response.data;
};

// Add an affirmation
export const addAffirmation = async (text, token) => {
  const response = await axiosInstance.post(
    '/affirmations',
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Delete an affirmation
export const deleteAffirmation = async (id, token) => {
  const response = await axiosInstance.delete(`/affirmations/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// User signup
export const signup = async (username, password) => {
  const response = await axiosInstance.post('/auth/signup', { username, password });
  return response.data;
};

// User login
export const login = async (username, password) => {
  const response = await axiosInstance.post('/auth/login', { username, password });
  return response.data;
};
