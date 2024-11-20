import { createContext, useContext, useReducer, useCallback } from 'react'

// Initial state
const initialState = {
  loading: false,
  filters: {
    year: 'ALL',
    type: null
  },
  imageCache: new Set(),
  error: null
}

// Action types
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_FILTERS: 'SET_FILTERS',
  ADD_TO_CACHE: 'ADD_TO_CACHE',
  SET_ERROR: 'SET_ERROR',
  RESET_FILTERS: 'RESET_FILTERS'
}

// Reducer
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case ACTIONS.SET_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      }
    case ACTIONS.ADD_TO_CACHE:
      return {
        ...state,
        imageCache: new Set([...state.imageCache, action.payload])
      }
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case ACTIONS.RESET_FILTERS:
      return {
        ...state,
        filters: initialState.filters
      }
    default:
      return state
  }
}

// Context
const AppContext = createContext(null)

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Actions
  const setLoading = useCallback((isLoading) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: isLoading })
  }, [])

  const setFilters = useCallback((filters) => {
    dispatch({ type: ACTIONS.SET_FILTERS, payload: filters })
  }, [])

  const addToImageCache = useCallback((imageSrc) => {
    dispatch({ type: ACTIONS.ADD_TO_CACHE, payload: imageSrc })
  }, [])

  const setError = useCallback((error) => {
    dispatch({ type: ACTIONS.SET_ERROR, payload: error })
  }, [])

  const resetFilters = useCallback(() => {
    dispatch({ type: ACTIONS.RESET_FILTERS })
  }, [])

  // Check if image is cached
  const isImageCached = useCallback((imageSrc) => {
    return state.imageCache.has(imageSrc)
  }, [state.imageCache])

  // Preload image
  const preloadImage = useCallback(async (imageSrc) => {
    if (isImageCached(imageSrc)) return

    try {
      setLoading(true)
      const img = new Image()
      img.src = imageSrc
      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
      })
      addToImageCache(imageSrc)
    } catch (error) {
      setError(`Failed to load image: ${imageSrc}`)
    } finally {
      setLoading(false)
    }
  }, [isImageCached, addToImageCache, setLoading, setError])

  // Filter data based on current filters
  const filterData = useCallback((data) => {
    return data.filter(item => {
      if (state.filters.year !== 'ALL' && item.year !== state.filters.year) {
        return false
      }
      if (state.filters.type && item.type !== state.filters.type) {
        return false
      }
      return true
    })
  }, [state.filters])

  const value = {
    ...state,
    setLoading,
    setFilters,
    addToImageCache,
    setError,
    resetFilters,
    isImageCached,
    preloadImage,
    filterData
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

// Custom hook to use the context
export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

export default AppContext
