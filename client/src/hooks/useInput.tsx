import { useState, useCallback } from 'react'

const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue)

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
    },
    [setValue]
  )

  return {
    value,
    onChange: handleChange,
    setValue,
  }
}

export default useInput
