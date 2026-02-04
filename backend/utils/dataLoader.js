import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get path to data file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataPath = join(__dirname, '../data/nba-teams.json');

// Cache for teams data (load once, reuse)
let teamsCache = null;

/**
 * Load teams data from JSON file
 * Uses caching to avoid reading file on every request
 */
export const loadTeamsData = () => {
  // Return cached data if available
  if (teamsCache) {
    return teamsCache;
  }

  try {
    const data = readFileSync(dataPath, 'utf8');
    const parsed = JSON.parse(data);
    
    // Validate data structure
    if (!parsed.teams || !Array.isArray(parsed.teams)) {
      throw new Error('Invalid data structure: teams array not found');
    }
    
    // Cache the data
    teamsCache = parsed;
    return teamsCache;
  } catch (error) {
    console.error('Error loading teams data:', error);
    throw new Error('Failed to load teams data');
  }
};

/**
 * Clear the cache (useful for testing or if data is updated)
 */
export const clearCache = () => {
  teamsCache = null;
};

/**
 * Validate team ID
 */
export const validateTeamId = (id) => {
  const numId = parseInt(id);
  if (isNaN(numId) || numId < 1) {
    throw new Error('Invalid team ID: must be a positive number');
  }
  return numId;
};

/**
 * Validate conference name
 */
export const validateConference = (conference) => {
  const validConferences = ['Eastern', 'Western'];
  const normalized = conference.charAt(0).toUpperCase() + conference.slice(1).toLowerCase();
  
  if (!validConferences.includes(normalized)) {
    throw new Error(`Invalid conference: must be one of ${validConferences.join(', ')}`);
  }
  
  return normalized;
};
