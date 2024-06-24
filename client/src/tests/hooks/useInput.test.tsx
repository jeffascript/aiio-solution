/* eslint-disable react/react-in-jsx-scope */
import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react'
import useInput from '@/hooks/useInput'

describe('useInput Hook', () => {
  it('should initialize with the given initial value', () => {
    const { result } = renderHook(() => useInput('initial'))

    expect(result.current.value).toBe('initial')
  })

  it('should update the value when onChange is called', () => {
    const { result } = renderHook(() => useInput(''))

    act(() => {
      result.current.onChange({
        target: { value: 'new value' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.value).toBe('new value')
  })

  it('should allow setting the value directly', () => {
    const { result } = renderHook(() => useInput(''))

    act(() => {
      result.current.setValue('direct set value')
    })

    expect(result.current.value).toBe('direct set value')
  })
})
