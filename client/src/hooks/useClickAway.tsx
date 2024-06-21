import { useEffect, useLayoutEffect, useRef } from 'react'

export const useClickAway = <T extends Element>(cb: (e: Event) => void) => {
  const ref = useRef(null) as unknown as React.MutableRefObject<T>
  const refCb = useRef(cb)

  useLayoutEffect(() => {
    refCb.current = cb
  })

  useEffect(() => {
    const handler = (e: Event | MouseEvent | TouchEvent) => {
      const element = ref.current
      if (element && !element.contains(e.target as T)) {
        refCb.current(e)
      }
    }

    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [])

  return ref
}
