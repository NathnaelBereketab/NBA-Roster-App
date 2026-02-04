function ConferenceFilter({ selectedConference, onConferenceChange }) {
  const conferences = [
    { name: 'All', icon: '🏀' },
    { name: 'Eastern', icon: '🌆' },
    { name: 'Western', icon: '🌴' }
  ];

  return (
    <div className="conference-filter">
      {conferences.map(({ name, icon }) => (
        <button
          key={name}
          className={`filter-button ${selectedConference === name ? 'active' : ''}`}
          onClick={() => onConferenceChange(name)}
          aria-label={`Filter by ${name} conference`}
        >
          <span className="filter-icon">{icon}</span>
          <span className="filter-text">{name}</span>
        </button>
      ))}
    </div>
  );
}

export default ConferenceFilter;
