import CheckboxWrapper from '@/molecules/CheckboxWrapper'
import React from 'react'

import { SubProducts } from '@/components/SubProducts'
import { useToggleItem } from '@/hooks/useToggleItem'
import ConditionalRender from '@/molecules/ConditionalRender'
import CheckboxInput from '@/atoms/CheckboxInput'
import { useSubcatergoriesContext } from '@/context/SubcategoryContext'

const SubcategoriesListView = ({ children }: { children?: React.ReactNode }) => {
  const { handleToggleSelectedItem, selectedItem } = useToggleItem('subcategories')

  const { filteredSubcategories: processedSubcategories } = useSubcatergoriesContext()

  if (!processedSubcategories || processedSubcategories.length === 0) return <p>No Sub-category!</p>

  return (
    <>
      {processedSubcategories.map(({ subCategoryName, subCategoryId, productId }) => (
        <React.Fragment key={`${productId}-${subCategoryId}-${subCategoryName}`}>
          <CheckboxWrapper key={subCategoryId}>
            <CheckboxInput
              label={subCategoryName}
              id={`${productId}-${subCategoryId}-${subCategoryName}`}
              name={subCategoryName}
              checked={!!selectedItem?.[`${productId}-${subCategoryId}-${subCategoryName}`]}
              onChange={() => {
                handleToggleSelectedItem(`${productId}-${subCategoryId}-${subCategoryName}`)
              }}
            />
          </CheckboxWrapper>
          <ConditionalRender
            condition={!!selectedItem?.[`${productId}-${subCategoryId}-${subCategoryName}`]}
          >
            {<SubProducts subCategoryId={subCategoryId} />}
          </ConditionalRender>
        </React.Fragment>
      ))}
    </>
  )
}

export default SubcategoriesListView
