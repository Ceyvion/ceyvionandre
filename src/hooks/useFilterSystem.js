import { useState, useEffect, useMemo } from 'react'

export function useFilterSystem(initialItems) {
  const [selectedYear, setSelectedYear] = useState('ALL')
  const [selectedModel, setSelectedModel] = useState('ALL')

  // Extract unique years and models from items
  const { years, models } = useMemo(() => {
    const yearsSet = new Set(['ALL'])
    const modelsSet = new Set(['ALL'])

    initialItems.forEach(item => {
      yearsSet.add(item.year)
      modelsSet.add(item.model)
    })

    return {
      years: Array.from(yearsSet).sort((a, b) => {
        if (a === 'ALL') return -1
        if (b === 'ALL') return 1
        return b.localeCompare(a)
      }),
      models: Array.from(modelsSet).sort((a, b) => {
        if (a === 'ALL') return -1
        if (b === 'ALL') return 1
        return a.localeCompare(b)
      })
    }
  }, [initialItems])

  // Filter items based on selected year and model
  const filteredItems = useMemo(() => {
    return initialItems.filter(item => {
      const yearMatch = selectedYear === 'ALL' || item.year === selectedYear
      const modelMatch = selectedModel === 'ALL' || item.model === selectedModel
      return yearMatch && modelMatch
    })
  }, [initialItems, selectedYear, selectedModel])

  const handleYearFilter = (year) => {
    setSelectedYear(year)
  }

  const handleModelFilter = (model) => {
    setSelectedModel(model)
  }

  return {
    filteredItems,
    filters: {
      years,
      models,
      selectedYear,
      selectedModel
    },
    handleYearFilter,
    handleModelFilter
  }
}
