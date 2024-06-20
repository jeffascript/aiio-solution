import React, { useCallback } from 'react'
import SearchInput from '@/atoms/SearchInput'
import useInput from '@/hooks/useInput'
import styles from '@/molecules/molecules.module.css'

const SearchBar = ({ children }: { children?: React.ReactNode }) => {
  const { onChange, value } = useInput('')

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event)
    },
    [onChange]
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
