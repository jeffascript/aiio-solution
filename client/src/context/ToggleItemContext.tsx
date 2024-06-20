import { useMemo, useReducer } from 'react'
import { createGenericContext } from '@/hooks/useGenericContext'

export interface State {
  selectedItems: { [key: string]: { [x: string]: boolean } }
}

export type Action = {
  type: 'TOGGLE_ITEM'
  payload: { group: string; item: string }
}

export const initialState: State = {
  selectedItems: {},
}

const toggleItemReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'TOGGLE_ITEM': {
      const { group, item } = action.payload
      const updatedSelectedItems = {
        ...state.selectedItems,
      }
      if (updatedSelectedItems[group]?.[item] === false) {
        delete updatedSelectedItems[group][item]
        if (Object.keys(updatedSelectedItems[group]).length === 0) {
          delete updatedSelectedItems[group]
        }
      } else {
        updatedSelectedItems[group] = {
          ...(updatedSelectedItems[group] || {}),
          [item]: !updatedSelectedItems[group]?.[item],
        }
      }
      return {
        ...state,
        selectedItems: updatedSelectedItems,
      }
    }
    default:
      return state
  }
}

interface ToggleItemContextType {
  toggleState: State
  dispatch: React.Dispatch<Action>
}

const [useToggleItemContext, ToggleItemProviderBase] = createGenericContext<
  ToggleItemContextType | undefined
>()

const ToggleItemProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(toggleItemReducer, initialState)

  // const [inputTracker, setInputTracker] = useState({
  //   products: {
  //     "1.1": true,
  //     "1.2": false
  //   }
  // })

  //   const {
  //     selectedItem: selectedProduct,
  //     handleSelectedItem: handleSelectedProduct,
  //   } = useSelectionState();

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

/// USAGE

//   const { state, dispatch } = useToggleItemContext();

// const handleToggleItem = (group: string, item: number) => {
//     dispatch({ type: "TOGGLE_ITEM", payload: { group, item } });
//   };
//   // usage

//    () =>  handleToggleItem("group1", 1)

//   let va =  state.selectedItems.group1[1]
//   console.log(va)
