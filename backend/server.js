import express from 'express';
import cors from 'cors';
import teamsRouter from './routes/teams.js';
import conferencesRouter from './routes/conferences.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware - Allow all origins for now
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/teams', teamsRouter);
app.use('/api/conferences', conferencesRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'NBA API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'NBA Teams API',
    version: '1.0.0',
    endpoints: {
      teams: '/api/teams',
      conferences: '/api/conferences',
      health: '/api/health'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
    availableEndpoints: [
      'GET /api/teams',
      'GET /api/teams/:id',
      'GET /api/teams/conference/:conference',
      'GET /api/conferences',
      'GET /api/health'
    ]
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
});
