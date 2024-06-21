import React, { useCallback } from 'react'
import SearchInput from '@/atoms/SearchInput'
import useInput from '@/hooks/useInput'
import styles from '@/molecules/molecules.module.css'
import { useSubcatergoriesContext } from '@/context/SubcategoryContext'
import { useSubproductsContext } from '@/context/SubProductContext'
import { customDebounce } from '@/utils/debounce'

const SearchBar = ({
  children,
  type,
}: {
  children?: React.ReactNode
  type: 'subcategories' | 'subproducts'
}) => {
  const { value, setValue } = useInput('')

  const handleSearch =
    type === 'subproducts'
      ? useSubproductsContext().handleSubproductSearch
      : useSubcatergoriesContext().handleSubcategorySearch

  const debouncedHandleSearch = useCallback(
    (val: string) => {
      // Returns a debounced function that will call `handleSearch`
      // with the provided value after a delay of 300 milliseconds.
      // The debounced function is created using the `customDebounce` function.
      return customDebounce(() => handleSearch(val), 300)
    },
    [handleSearch]
  )

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
      debouncedHandleSearch(event.target.value)()
    },
    [handleSearch, debouncedHandleSearch]
  )

  return (
    <div className={styles['form__searchBarContainer']}>
      <SearchInput
        placeholder={children?.toString() || ''}
        name="searchBar"
        value={value}
        onChange={handleSearchChange}
        className={styles['form__searchBar']}
        aria-label="Search through subcategory contents"
      />
    </div>
  )
}

export default SearchBar
