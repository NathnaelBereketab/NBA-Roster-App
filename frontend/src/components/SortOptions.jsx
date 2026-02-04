function SortOptions({ sortBy, onSortChange }) {
  const sortOptions = [
    { value: 'name-asc', label: 'Name (A-Z)', icon: '🔤' },
    { value: 'name-desc', label: 'Name (Z-A)', icon: '🔤' },
    { value: 'conference', label: 'Conference', icon: '🏀' },
  ];

  return (
    <div className="sort-options">
      <label htmlFor="sort-select" className="sort-label">
        <span className="sort-icon">📊</span>
        Sort by:
      </label>
      <select
        id="sort-select"
        className="sort-select"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        aria-label="Sort teams"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortOptions;
