const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(errorData.error || errorData.message || 'Request failed');
    error.status = response.status;
    error.data = errorData;
    throw error;
  }
  return response.json();
};

// Helper function to make API requests with error handling
const apiRequest = async (url, options = {}) => {
  try {
    const fullUrl = `${API_BASE_URL}${url}`;
    console.log('API Request:', fullUrl);
    
    const response = await fetch(fullUrl, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    console.log('API Response status:', response.status);
    return await handleResponse(response);
  } catch (error) {
    // Network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      console.error('Network error:', error);
      throw new Error('Network error: Unable to connect to the server. Make sure the backend is running on port 3001.');
    }
    console.error('API Error:', error);
    throw error;
  }
};

// Get all teams (supports query parameters)
export const getTeams = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  if (filters.conference) queryParams.append('conference', filters.conference);
  if (filters.search) queryParams.append('search', filters.search);
  
  const queryString = queryParams.toString();
  const url = `/teams${queryString ? `?${queryString}` : ''}`;
  
  const data = await apiRequest(url);
  // Handle both old format (array) and new format (object with teams property)
  return Array.isArray(data) ? data : data.teams || [];
};

// Get a specific team by ID
export const getTeam = async (id) => {
  if (!id) {
    throw new Error('Team ID is required');
  }
  return await apiRequest(`/teams/${id}`);
};

// Get teams by conference
export const getTeamsByConference = async (conference) => {
  if (!conference) {
    throw new Error('Conference is required');
  }
  const data = await apiRequest(`/teams/conference/${conference}`);
  return Array.isArray(data) ? data : data.teams || [];
};

// Get all conferences
export const getConferences = async () => {
  return await apiRequest('/conferences');
};

// Get conference details
export const getConferenceDetails = async (conference) => {
  if (!conference) {
    throw new Error('Conference is required');
  }
  return await apiRequest(`/conferences/${conference}`);
};

// Health check
export const checkHealth = async () => {
  return await apiRequest('/health');
};
