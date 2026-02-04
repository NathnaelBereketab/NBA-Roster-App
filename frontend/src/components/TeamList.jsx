import TeamCard from './TeamCard';

function TeamList({ teams }) {
  if (teams.length === 0) {
    return (
      <div className="no-teams">
        <div className="no-teams-icon">🏀</div>
        <p>No teams found.</p>
        <p className="no-teams-hint">Try selecting a different conference filter.</p>
      </div>
    );
  }

  return (
    <div className="team-list">
      {teams.map(team => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  );
}

export default TeamList;
