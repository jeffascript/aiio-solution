import { AllData, DoneResult, DoneResultAsNode } from '@/types'

export interface State {
  selectedItems: { [key: string]: { [x: string]: boolean } }
}

export type Action = {
  type: 'TOGGLE_ITEM' | 'RESET_FORM_STATE'
  payload: { group: string; item: string }
}

export interface ToggleItemContextType {
  selectedInputs: State
  dispatch: React.Dispatch<Action>
  toggleModal: () => void
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  doneResultAsNode: DoneResultAsNode
  doneResult: DoneResult
  processAllSelectedData: (data: AllData) => void
  getAllSelectedData: () => void
}
