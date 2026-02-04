import express from 'express';
import { loadTeamsData, validateConference } from '../utils/dataLoader.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// GET /api/conferences - Get all conferences with team counts
router.get('/', asyncHandler(async (req, res) => {
  const data = loadTeamsData();
  const conferences = {
    Eastern: data.teams.filter(t => t.conference === 'Eastern').length,
    Western: data.teams.filter(t => t.conference === 'Western').length
  };
  
  res.json({
    conferences: ['Eastern', 'Western'],
    counts: conferences,
    total: data.teams.length
  });
}));

// GET /api/conferences/:conference - Get detailed conference info
router.get('/:conference', asyncHandler(async (req, res) => {
  const data = loadTeamsData();
  const conference = validateConference(req.params.conference);
  
  const teams = data.teams.filter(t => t.conference === conference);
  
  res.json({
    conference,
    teamCount: teams.length,
    teams: teams.map(t => ({
      id: t.id,
      name: t.name,
      city: t.city,
      logo: t.logo
    }))
  });
}));

export default router;
