import React from 'react'

export default function FilterBar({ filters, onYearFilter, onModelFilter }) {
  const { years, models, selectedYear, selectedModel } = filters

  return (
    <div className="grid grid-cols-12 gap-4 mt-0 mb-12">
      {/* Year Filter */}
      <div className="col-start-2 col-span-5">
        <h2 className="font-helvetica text-xs tracking-widest mb-4 uppercase">Year</h2>
        <div className="flex gap-8">
          <button
            onClick={() => onYearFilter('ALL')}
            className={`font-helvetica text-sm tracking-wide transition-colors duration-300 ${
              selectedYear === 'ALL'
                ? 'text-accent'
                : 'text-black hover:text-accent'
            }`}
          >
            ALL
          </button>
          {years.map(year => (
            year !== 'ALL' && (
              <button
                key={year}
                onClick={() => onYearFilter(year)}
                className={`font-helvetica text-sm tracking-wide transition-colors duration-300 ${
                  selectedYear === year
                    ? 'text-accent'
                    : 'text-black hover:text-accent'
                }`}
              >
                {year}
              </button>
            )
          ))}
        </div>
      </div>

      {/* Model Filter */}
      <div className="col-start-7 col-span-5">
        <h2 className="font-helvetica text-xs tracking-widest mb-4 uppercase">Model</h2>
        <div className="flex gap-8">
          <button
            onClick={() => onModelFilter('ALL')}
            className={`font-helvetica text-sm tracking-wide transition-colors duration-300 ${
              selectedModel === 'ALL'
                ? 'text-accent'
                : 'text-black hover:text-accent'
            }`}
          >
            ALL
          </button>
          {models.map(model => (
            model !== 'ALL' && (
              <button
                key={model}
                onClick={() => onModelFilter(model)}
                className={`font-helvetica text-sm tracking-wide transition-colors duration-300 ${
                  selectedModel === model
                    ? 'text-accent'
                    : 'text-black hover:text-accent'
                }`}
              >
                {model.charAt(0).toUpperCase() + model.slice(1)}
              </button>
            )
          ))}
        </div>
      </div>
    </div>
  )
}
