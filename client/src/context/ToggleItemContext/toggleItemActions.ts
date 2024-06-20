export interface State {
  selectedItems: { [key: string]: { [x: string]: boolean } }
}

export type Action = {
  type: 'TOGGLE_ITEM'
  payload: { group: string; item: string }
}

export interface ToggleItemContextType {
  toggleState: State
  dispatch: React.Dispatch<Action>
}
