import CheckboxWrapper from '@/molecules/CheckboxWrapper'
import React from 'react'

import { useToggleItem } from '@/hooks/useToggleItem'
import CheckboxInput from '@/atoms/CheckboxInput'
import { useSubproductsContext } from '@/context/SubProductContext'

const SubproductsListView = ({ children }: { children?: React.ReactNode }) => {
  const { handleToggleSelectedItem, selectedItem } = useToggleItem('subproducts')

  const { filteredSubProducts: processedSubProducts } = useSubproductsContext()

  if (!processedSubProducts || processedSubProducts.length === 0) return <p>No Sub-Product!</p>

  return (
    <>
      {processedSubProducts.map(({ subProductId, subProductName, subCategoryId }) => (
        <React.Fragment key={`${subCategoryId}-${subProductId}-${subProductName}`}>
          <CheckboxWrapper innermostCheckbox>
            <CheckboxInput
              id={`${subCategoryId}-${subProductId}-${subProductName}`}
              label={subProductName}
              name={subProductName}
              checked={
                selectedItem?.[`${subCategoryId}-${subProductId}-${subProductName}`] ?? false
              }
              onChange={() =>
                handleToggleSelectedItem(`${subCategoryId}-${subProductId}-${subProductName}`)
              }
            />
          </CheckboxWrapper>
        </React.Fragment>
      ))}
    </>
  )
}

export default SubproductsListView
