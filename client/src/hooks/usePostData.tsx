import { useState } from 'react'

const usePostData = <T,>() => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const postData = async (url: string, data: T) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      setIsLoading(false)
      return result
    } catch (error) {
      // Check if error is an object with a 'message' property
      const errorMessage =
        error && typeof error === 'object' && 'message' in error
          ? error.message
          : 'An error occurred while posting data.'

      setError(errorMessage)
      setIsLoading(false)
      return Promise.reject(errorMessage)
    }
  }

  return { isLoading, error, postData }
}

export default usePostData
