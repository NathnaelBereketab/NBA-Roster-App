import express from 'express';
import { loadTeamsData, validateTeamId, validateConference } from '../utils/dataLoader.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// GET /api/teams - Get all teams
router.get('/', asyncHandler(async (req, res) => {
  const data = loadTeamsData();
  
  // Support query parameters for filtering
  let teams = data.teams;
  
  // Filter by conference if provided
  if (req.query.conference) {
    const conference = validateConference(req.query.conference);
    teams = teams.filter(t => t.conference === conference);
  }
  
  // Support search by name
  if (req.query.search) {
    const searchTerm = req.query.search.toLowerCase();
    teams = teams.filter(t => 
      t.name.toLowerCase().includes(searchTerm) ||
      t.city.toLowerCase().includes(searchTerm)
    );
  }
  
  res.json({
    count: teams.length,
    teams
  });
}));

// GET /api/teams/conference/:conference - Get teams by conference
router.get('/conference/:conference', asyncHandler(async (req, res) => {
  const data = loadTeamsData();
  const conference = validateConference(req.params.conference);
  
  const filteredTeams = data.teams.filter(t => t.conference === conference);
  
  res.json({
    conference,
    count: filteredTeams.length,
    teams: filteredTeams
  });
}));

// GET /api/teams/:id - Get specific team by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const data = loadTeamsData();
  const id = validateTeamId(req.params.id);
  
  const team = data.teams.find(t => t.id === id);
  
  if (!team) {
    return res.status(404).json({
      error: 'Team not found',
      message: `No team found with ID ${id}`
    });
  }
  
  res.json(team);
}));

export default router;
