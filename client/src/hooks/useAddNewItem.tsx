import { useCallback } from 'react'

/**
 * A custom hook to handle adding new items to a list.
 *
 * @template T - The type of the items in the list.
 * @param {T[]} allItemsState - The current state of all items.
 * @param {React.Dispatch<React.SetStateAction<T[]>>} setAllItemsState - Function to update the state of all items.
 * @param {React.Dispatch<React.SetStateAction<T[]>>} setFilteredItems - Function to update the state of filtered items.
 * @param {number} selectedCategoryId - The ID of the selected category to which the new item belongs.
 * @param {keyof T} lookupId - The key in the item object that corresponds to the category ID.
 * @returns {Function} - A function to handle adding a new item.
 */
export const useAddNewItem = <T extends { [key: string]: unknown }>(
  allItemsState: T[],
  setAllItemsState: React.Dispatch<React.SetStateAction<T[]>>,
  setFilteredItems: React.Dispatch<React.SetStateAction<T[]>>,
  selectedCategoryId: number,
  lookupId: keyof T
) => {
  /**
   * Function to handle adding a new item to the list.
   *
   * @param {string} value - The name or value of the new item to be added.
   */
  const handleAddNewItem = useCallback(
    (value: string) => {
      // Create a new item object with the provided value and selected category ID.
      const newItem = {
        id: allItemsState.length, // Assign a unique ID based on the current length of the items array.
        name: value, // Set the name of the new item.
        [lookupId]: selectedCategoryId, // Dynamically set the category ID using the lookupId key.
      }

      // Update the state of all items by adding the new item to the existing array.
      setAllItemsState((prev) => [...prev, newItem as unknown as T])

      // Update the state of filtered items by adding the new item to the existing array.
      setFilteredItems((prev) => [...prev, newItem as unknown as T])
    },
    [allItemsState, selectedCategoryId, setAllItemsState, setFilteredItems, lookupId] // Dependencies for the useCallback hook.
  )

  // Return the function to handle adding a new item.
  return handleAddNewItem
}
