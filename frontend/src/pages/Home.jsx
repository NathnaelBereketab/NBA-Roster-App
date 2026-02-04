import { useState, useEffect, useCallback, useMemo } from 'react';
import TeamList from '../components/TeamList';
import ConferenceFilter from '../components/ConferenceFilter';
import SearchBar from '../components/SearchBar';
import SortOptions from '../components/SortOptions';
import Statistics from '../components/Statistics';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getTeams } from '../services/api';

function Home() {
  const [allTeams, setAllTeams] = useState([]);
  const [selectedConference, setSelectedConference] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const loadTeams = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTeams();
      setAllTeams(data);
    } catch (err) {
      const errorMessage = err.message || 'Failed to load teams. Please try again later.';
      setError(errorMessage);
      console.error('Error loading teams:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTeams();
  }, [loadTeams]);

  // Filter and sort teams
  const filteredAndSortedTeams = useMemo(() => {
    let filtered = [...allTeams];

    // Filter by conference
    if (selectedConference !== 'All') {
      filtered = filtered.filter(team => team.conference === selectedConference);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(team =>
        team.name.toLowerCase().includes(search) ||
        team.city.toLowerCase().includes(search)
      );
    }

    // Sort teams
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'conference':
          return a.conference.localeCompare(b.conference) || a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [allTeams, selectedConference, searchTerm, sortBy]);

  const handleConferenceChange = (conference) => {
    setSelectedConference(conference);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    loadTeams();
  };

  return (
    <div className="home">
      <div className="header-section">
        <h1 className="page-title">🏀 NBA Teams & Conferences</h1>
        <p className="page-subtitle">Click on a team to see their conference details</p>
      </div>

      <Statistics totalTeams={allTeams.length} />

      <div className="filters-section">
        <ConferenceFilter
          selectedConference={selectedConference}
          onConferenceChange={handleConferenceChange}
        />
        
        <div className="search-sort-container">
          <SearchBar onSearch={handleSearch} />
          <SortOptions sortBy={sortBy} onSortChange={handleSortChange} />
        </div>
      </div>

      {loading && <LoadingSpinner message="Loading teams..." showSkeleton={true} skeletonCount={6} />}
      
      {error && (
        <ErrorMessage 
          message={error} 
          onRetry={handleRetry}
          retryCount={retryCount}
        />
      )}
      
      {!loading && !error && (
        <>
          <div className="teams-count">
            Showing {filteredAndSortedTeams.length} of {allTeams.length} team{filteredAndSortedTeams.length !== 1 ? 's' : ''}
            {selectedConference !== 'All' && ` (${selectedConference} Conference)`}
            {searchTerm && ` matching "${searchTerm}"`}
          </div>
          <TeamList teams={filteredAndSortedTeams} />
        </>
      )}
    </div>
  );
}

export default Home;
