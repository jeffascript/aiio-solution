import { useMemo, useReducer } from 'react'
import { createGenericContext } from '@/hooks/useGenericContext'
import { State, ToggleItemContextType } from './toggleItemActions'
import { toggleItemReducer } from './toggleItemReducer'
import { useToggleModal } from '@/hooks/useToggleModal'

const initialState: State = {
  selectedItems: {},
}

const [useToggleItemContext, ToggleItemProviderBase] = createGenericContext<
  ToggleItemContextType | undefined
>()

const ToggleItemProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(toggleItemReducer, initialState)
  const { toggleModal, isModalOpen, setIsModalOpen } = useToggleModal()

  const contextValue = useMemo(
    () => ({
      selectedInputs: state,
      dispatch,
      toggleModal,
      isModalOpen,
      setIsModalOpen,
    }),
    [state, dispatch, toggleModal, isModalOpen, setIsModalOpen]
  )

  // eslint-disable-next-line react/react-in-jsx-scope
  return <ToggleItemProviderBase value={contextValue}>{children}</ToggleItemProviderBase>
}
export { ToggleItemProvider, useToggleItemContext }
