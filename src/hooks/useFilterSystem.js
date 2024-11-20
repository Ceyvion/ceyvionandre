import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useApp } from '../context/AppContext'

export function useFilterSystem(initialData = [], options = {}) {
  const {
    persistFilters = true,
    defaultYear = 'ALL',
    defaultType = null,
    updateUrl = true
  } = options

  const router = useRouter()
  const { filters, setFilters, filterData } = useApp()
  const [filteredItems, setFilteredItems] = useState(initialData)

  // Initialize filters from URL if present
  useEffect(() => {
    if (!persistFilters) return

    const { year, type } = router.query
    const initialFilters = {
      year: year || defaultYear,
      type: type || defaultType
    }

    setFilters(initialFilters)
  }, [router.query, persistFilters, defaultYear, defaultType, setFilters])

  // Update URL when filters change
  useEffect(() => {
    if (!updateUrl) return

    const query = {}
    if (filters.year !== defaultYear) query.year = filters.year
    if (filters.type !== defaultType) query.type = filters.type

    router.push({
      pathname: router.pathname,
      query
    }, undefined, { shallow: true })
  }, [filters, defaultYear, defaultType, router, updateUrl])

  // Update filtered items when data or filters change
  useEffect(() => {
    setFilteredItems(filterData(initialData))
  }, [initialData, filterData])

  // Filter handlers
  const handleYearFilter = useCallback((year) => {
    setFilters({ year })
  }, [setFilters])

  const handleTypeFilter = useCallback((type) => {
    setFilters({ type: type === filters.type ? null : type })
  }, [filters.type, setFilters])

  const clearFilters = useCallback(() => {
    setFilters({
      year: defaultYear,
      type: defaultType
    })
  }, [defaultYear, defaultType, setFilters])

  // Get active filters
  const getActiveFilters = useCallback(() => {
    const active = []
    if (filters.year !== defaultYear) active.push(filters.year)
    if (filters.type) active.push(filters.type)
    return active
  }, [filters, defaultYear])

  // Check if any filters are active
  const hasActiveFilters = useCallback(() => {
    return filters.year !== defaultYear || filters.type !== defaultType
  }, [filters, defaultYear, defaultType])

  // Get filter stats
  const getFilterStats = useCallback(() => {
    const total = initialData.length
    const filtered = filteredItems.length
    const hidden = total - filtered

    return {
      total,
      filtered,
      hidden,
      hasFilters: hasActiveFilters()
    }
  }, [initialData.length, filteredItems.length, hasActiveFilters])

  return {
    filteredItems,
    filters,
    handleYearFilter,
    handleTypeFilter,
    clearFilters,
    getActiveFilters,
    hasActiveFilters,
    getFilterStats
  }
}

// Filter option constants
export const YEARS = ['2024', '2023', '2022', 'ALL']
export const TYPES = ['EDITORIAL', 'COMMERCIAL', 'PERSONAL']

export default useFilterSystem
