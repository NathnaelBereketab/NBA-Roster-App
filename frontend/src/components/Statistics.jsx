import { useState, useEffect } from 'react';
import { getConferences } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

function Statistics({ totalTeams }) {
  const [conferences, setConferences] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getConferences();
        setConferences(data);
      } catch (error) {
        console.error('Error loading statistics:', error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) {
    return <div className="statistics-loading">Loading stats...</div>;
  }

  return (
    <div className="statistics">
      <div className="stat-card">
        <div className="stat-icon">🏀</div>
        <div className="stat-value">{totalTeams}</div>
        <div className="stat-label">Total Teams</div>
      </div>
      {conferences && (
        <>
          <div className="stat-card">
            <div className="stat-icon">🌆</div>
            <div className="stat-value">{conferences.counts.Eastern}</div>
            <div className="stat-label">Eastern</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🌴</div>
            <div className="stat-value">{conferences.counts.Western}</div>
            <div className="stat-label">Western</div>
          </div>
        </>
      )}
    </div>
  );
}

export default Statistics;
