import { useNavigate } from 'react-router-dom';

function TeamCard({ team }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/team/${team.id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div 
      className="team-card" 
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${team.name}`}
    >
      <div className="team-logo-wrapper">
        <img 
          src={team.logo} 
          alt={`${team.name} logo`} 
          className="team-logo"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/150?text=NBA';
          }}
        />
      </div>
      <div className="team-card-content">
        <h3>{team.name}</h3>
        <div className="team-card-footer">
          <span className={`conference-badge ${team.conference.toLowerCase()}`}>
            {team.conference}
          </span>
          <span className="view-details">View Details →</span>
        </div>
      </div>
    </div>
  );
}

export default TeamCard;
