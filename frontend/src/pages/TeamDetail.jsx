import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTeam, getTeamsByConference } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function TeamDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [conferenceTeams, setConferenceTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (id) {
      loadTeam();
    }
  }, [id]);

  const loadTeam = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTeam(id);
      setTeam(data);
      
      // Load other teams in the same conference
      if (data.conference) {
        try {
          const conferenceData = await getTeamsByConference(data.conference);
          // Filter out current team
          const otherTeams = conferenceData.filter(t => t.id !== data.id);
          setConferenceTeams(otherTeams);
        } catch (err) {
          console.error('Error loading conference teams:', err);
        }
      }
    } catch (err) {
      const errorMessage = err.message || 'Failed to load team details.';
      setError(errorMessage);
      console.error('Error loading team:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    loadTeam();
  };

  if (loading) {
    return (
      <div className="team-detail">
        <button onClick={() => navigate('/')} className="back-button">
          ← Back to Teams
        </button>
        <LoadingSpinner message="Loading team details..." />
      </div>
    );
  }

  if (error || !team) {
    return (
      <div className="team-detail">
        <button onClick={() => navigate('/')} className="back-button">
          ← Back to Teams
        </button>
        <div className="error-container">
          <ErrorMessage 
            message={error || 'Team not found'} 
            onRetry={handleRetry}
            retryCount={retryCount}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="team-detail">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Teams
      </button>
      
      <div className="team-detail-card">
        <div className="team-logo-container">
          <img 
            src={team.logo} 
            alt={team.name} 
            className="team-logo-large"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/200?text=NBA';
            }}
          />
        </div>
        <h1>{team.name}</h1>
        <div className="team-info">
          <div className="info-item">
            <span className="label">📍 City:</span>
            <span className="value">{team.city}</span>
          </div>
          <div className="info-item">
            <span className="label">🏀 Conference:</span>
            <span className={`conference-badge ${team.conference.toLowerCase()}`}>
              {team.conference}
            </span>
          </div>
        </div>
        
        {team.roster && team.roster.length > 0 && (
          <div className="team-roster">
            <h2 className="roster-title">👥 Team Roster</h2>
            <div className="roster-grid">
              {team.roster.map((player, index) => (
                <div key={index} className="player-card">
                  <div className="player-image-wrapper">
                    <img 
                      src={player.image} 
                      alt={player.name}
                      className="player-image"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150?text=Player';
                      }}
                    />
                    <div className="player-number">{player.number}</div>
                  </div>
                  <div className="player-info">
                    <h3 className="player-name">{player.name}</h3>
                    <span className="player-position">{player.position}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {conferenceTeams.length > 0 && (
          <div className="conference-teams">
            <h2 className="conference-teams-title">
              Other {team.conference} Conference Teams ({conferenceTeams.length})
            </h2>
            <div className="conference-teams-list">
              {conferenceTeams.slice(0, 6).map(otherTeam => (
                <div 
                  key={otherTeam.id} 
                  className="conference-team-item"
                  onClick={() => navigate(`/team/${otherTeam.id}`)}
                >
                  <img 
                    src={otherTeam.logo} 
                    alt={otherTeam.name}
                    className="conference-team-logo"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/50?text=NBA';
                    }}
                  />
                  <span className="conference-team-name">{otherTeam.name}</span>
                </div>
              ))}
            </div>
            {conferenceTeams.length > 6 && (
              <p className="conference-teams-more">
                +{conferenceTeams.length - 6} more teams
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamDetail;
