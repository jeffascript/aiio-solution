import { Action, State } from './toggleItemtypes'

export const toggleItemReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'TOGGLE_ITEM': {
      const { group, item } = action.payload
      return {
        ...state,
        selectedItems: {
          ...state.selectedItems,
          [group]: {
            ...state.selectedItems[group],
            [item]: !state.selectedItems[group]?.[item],
          },
        },
      }
    }
    default:
      return state
  }
}
