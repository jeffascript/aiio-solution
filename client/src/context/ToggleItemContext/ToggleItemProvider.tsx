import { useMemo, useReducer } from 'react'
import { createGenericContext } from '@/hooks/useGenericContext'
import { State, ToggleItemContextType } from './toggleItemActions'
import { toggleItemReducer } from './toggleItemReducer'

const initialState: State = {
  selectedItems: {},
}

const [useToggleItemContext, ToggleItemProviderBase] = createGenericContext<
  ToggleItemContextType | undefined
>()

const ToggleItemProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(toggleItemReducer, initialState)

  const contextValue = useMemo(
    () => ({
      toggleState: state,
      dispatch,
    }),
    [state, dispatch]
  )

  // eslint-disable-next-line react/react-in-jsx-scope
  return <ToggleItemProviderBase value={contextValue}>{children}</ToggleItemProviderBase>
}
export { ToggleItemProvider, useToggleItemContext }
