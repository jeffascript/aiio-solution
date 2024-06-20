import CheckboxWrapper from '@/molecules/CheckboxWrapper'
import React from 'react'

import subcategories from '../../../public/data/subcategories.json'
import PolymorphicInput from '@/atoms/PolyMorphicInput'

import { SubProducts } from '@/components/SubProducts'
import { useToggleItem } from '@/hooks/useToggleItem'
import ConditionalRender from '@/molecules/ConditionalRender'

const SubcategoriesListView = ({
  children,
  productId,
}: {
  children?: React.ReactNode
  productId: number
}) => {
  const preparedSubcategories = subcategories.subcategories.filter(
    (subcategory) => subcategory.productId === productId
  )

  const { handleToggleSelectedItem, selectedItem } = useToggleItem('subcategories')

  return (
    <>
      {preparedSubcategories.map(({ subCategoryName, subCategoryId }) => (
        <React.Fragment key={`${productId}-${subCategoryId}-${subCategoryName}`}>
          <CheckboxWrapper key={subCategoryId}>
            <PolymorphicInput
              label={subCategoryName}
              type="checkbox"
              name={subCategoryName}
              checked={!!selectedItem?.[`${productId}-${subCategoryId}-${subCategoryName}`]}
              onChange={() => {
                handleToggleSelectedItem(`${productId}-${subCategoryId}-${subCategoryName}`)
              }}
              id={subCategoryId}
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
