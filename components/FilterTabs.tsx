'use client'

interface FilterTabsProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export default function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  
  const filters = [
    { key: 'filter.all', value: 'All' },
    { key: 'filter.featured', value: 'Featured' },
    { key: 'filter.us', value: 'US Datacenter' },
    { key: 'filter.ssd', value: 'SSD' },
    { key: 'filter.cn2', value: 'CN2' },
    { key: 'filter.annual', value: 'Annual Discount' }
  ]

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            activeFilter === filter.value
              ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
              : 'bg-dark-700/50 text-gray-300 hover:bg-dark-600 hover:text-white border border-dark-600'
          }`}
        >
          {filter.value}
        </button>
      ))}
    </div>
  )
}
