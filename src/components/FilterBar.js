import { memo } from 'react'
import { YEARS, TYPES } from '../hooks/useFilterSystem'

const FilterBar = ({
  filters,
  onYearFilter,
  onTypeFilter,
  onClear,
  stats,
  className = ''
}) => {
  return (
    <div className={`sticky top-16 bg-primary z-20 py-8 ${className}`}>
      <div className="flex flex-col items-center space-y-6">
        {/* Year Filter */}
        <div className="flex flex-wrap justify-center gap-4 items-center">
          <span className="text-text">YEAR:</span>
          <div className="flex flex-wrap gap-4">
            {YEARS.map(year => (
              <button
                key={year}
                onClick={() => onYearFilter(year)}
                className={`
                  px-4 py-1 transition-all duration-200
                  ${filters.year === year 
                    ? 'bg-accent text-primary' 
                    : 'text-text hover:text-accent'}
                `}
                aria-pressed={filters.year === year}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div className="flex flex-wrap justify-center gap-4 items-center">
          <span className="text-text">TYPE:</span>
          <div className="flex flex-wrap gap-4">
            {TYPES.map(type => (
              <button
                key={type}
                onClick={() => onTypeFilter(type)}
                className={`
                  px-4 py-1 transition-all duration-200
                  ${filters.type === type 
                    ? 'bg-accent text-primary' 
                    : 'text-text hover:text-accent'}
                `}
                aria-pressed={filters.type === type}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Stats & Clear Button */}
        {stats && stats.hasFilters && (
          <div className="flex items-center gap-4 text-small">
            <span className="text-text">
              Showing {stats.filtered} of {stats.total}
            </span>
            <button
              onClick={onClear}
              className="text-accent hover:underline"
              aria-label="Clear all filters"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-light" />

      {/* Filter Active Indicator */}
      {stats && stats.hasFilters && (
        <div className="absolute bottom-0 left-0 h-px bg-accent" style={{
          width: `${(stats.filtered / stats.total) * 100}%`,
          transition: 'width 0.3s ease-custom'
        }} />
      )}
    </div>
  )
}

// Memoize the component to prevent unnecessary re-renders
export default memo(FilterBar, (prevProps, nextProps) => {
  // Custom comparison function
  return (
    prevProps.filters.year === nextProps.filters.year &&
    prevProps.filters.type === nextProps.filters.type &&
    prevProps.stats?.filtered === nextProps.stats?.filtered &&
    prevProps.stats?.total === nextProps.stats?.total
  )
})
