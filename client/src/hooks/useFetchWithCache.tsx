import { useState, useEffect, useCallback, useRef } from 'react'

export const useFetchWithCache = <T extends Array<Record<string, unknown>>>(
  urls: string[],
  callback?: (data: T) => void
) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<T | null>(null)
  const [cacheKeySuffix, setCacheKeySuffix] = useState<string>('')

  const cache = useRef<Record<string, T>>({})

  const fetchData = useCallback(
    async (skipCache = false) => {
      setIsLoading(true)
      setError(null)
      try {
        const cacheKey = `${urls.join(',')}${cacheKeySuffix}`
        if (cache.current[cacheKey] && !skipCache) {
          const cachedData = cache.current[cacheKey]
          console.log('cache', cache.current)
          setData(cachedData)
          callback?.(cachedData)
        } else {
          console.log('new', cache.current)
          const responses = await Promise.all(urls.map((url) => fetch(url)))

          const isOk = responses.every((response) => response.ok)
          if (!isOk) {
            throw new Error('Network response was not ok')
          }
          const data = await Promise.all(responses.map((response) => response.json()))
          const typedData = data as unknown as T
          cache.current[cacheKey] = typedData
          setData(typedData)
          callback?.(typedData)
        }
      } catch (err) {
        setError('Error fetching data')
        console.error('Error fetching data', err)
      } finally {
        setIsLoading(false)
      }
    },
    [urls, callback, cacheKeySuffix]
  )

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const refetch = useCallback(() => {
    fetchData(true)
  }, [fetchData])

  const updateCacheKeySuffixForRefetchingData = useCallback((suffix: string) => {
    setCacheKeySuffix(suffix)
  }, [])

  return { data, isLoading, error, refetch, updateCacheKeySuffixForRefetchingData }
}
