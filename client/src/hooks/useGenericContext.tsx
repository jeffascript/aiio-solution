import { createContext, useContext, ReactNode } from 'react'

export function createGenericContext<T>() {
  const context = createContext<T | null>(null)

  const useGenericContext = () => {
    const ctx = useContext(context)
    if (!ctx) {
      throw new Error('useGenericContext must be used within a Provider')
    }
    return ctx
  }

  const Provider = ({ value, children }: { value: T; children: ReactNode }) => {
    // eslint-disable-next-line react/react-in-jsx-scope
    return <context.Provider value={value}>{children}</context.Provider>
  }

  return [useGenericContext, Provider] as const
}
