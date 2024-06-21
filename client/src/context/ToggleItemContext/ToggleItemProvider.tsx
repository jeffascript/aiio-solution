import React, { useCallback, useEffect, useMemo, useReducer } from 'react'
import { createGenericContext } from '@/hooks/useGenericContext'
import { State, ToggleItemContextType } from './toggleItemActions'
import { toggleItemReducer } from './toggleItemReducer'
import { useToggleModal } from '@/hooks/useToggleModal'
import { useProcessSelectedData } from '@/hooks/useProcessDone'
import { AllData } from '@/types'

const initialState: State = {
  selectedItems: {},
}

const [useToggleItemContext, ToggleItemProviderBase] = createGenericContext<
  ToggleItemContextType | undefined
>()

const ToggleItemProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(toggleItemReducer, initialState)
  const { toggleModal, isModalOpen, setIsModalOpen } = useToggleModal()
  const { doneResultAsNode, doneResult, processAllSelectedData } = useProcessSelectedData()

  const getAllSelectedData = useCallback(() => {
    return processAllSelectedData(state.selectedItems as AllData)
  }, [processAllSelectedData, state.selectedItems])

  useEffect(() => {
    getAllSelectedData()
  }, [getAllSelectedData])

  const contextValue = useMemo(
    () => ({
      selectedInputs: state,
      dispatch,
      toggleModal,
      isModalOpen,
      setIsModalOpen,
      doneResultAsNode,
      doneResult,
      processAllSelectedData,
      getAllSelectedData,
    }),
    [
      state,
      dispatch,
      toggleModal,
      isModalOpen,
      setIsModalOpen,
      doneResultAsNode,
      doneResult,
      processAllSelectedData,
      getAllSelectedData,
    ]
  )

  return <ToggleItemProviderBase value={contextValue}>{children}</ToggleItemProviderBase>
}
export { ToggleItemProvider, useToggleItemContext }
