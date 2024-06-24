import usePostData from '@/hooks/usePostData'
import { renderHook, act } from '@testing-library/react-hooks'

// Mock the fetch API
const mockFetch = jest.fn()
global.fetch = mockFetch as jest.Mock

describe('usePostData Hook', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  it('should initialize with isLoading as false and error as null', () => {
    const { result } = renderHook(() => usePostData())

    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe(null)
  })

  it('should handle successful post request', async () => {
    const mockResponse = { data: 'test' }
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const { result, waitForNextUpdate } = renderHook(() => usePostData())

    act(() => {
      result.current.postData('https://example.com', { key: 'value' })
    })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.error).toBe(null)

    await waitForNextUpdate()

    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe(null)
    expect(mockFetch).toHaveBeenCalledWith('https://example.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key: 'value' }),
    })
  })
})
