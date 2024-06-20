import CheckboxWrapper from '@/molecules/CheckboxWrapper'
import React from 'react'

import subcategories from '../../../public/data/subcategories.json'
import PolymorphicInput from '@/atoms/PolyMorphicInput'

import { SubProducts } from '@/components/SubProducts'

const SubcategoriesListView = ({
  children,
  productId,
}: {
  children?: React.ReactNode
  productId: number
}) => {
  const filteredSubcategories = subcategories.subcategories.filter(
    (subcategory) => subcategory.productId === productId
  )

  const [selectedSubcategory, setSelectedSubcategory] = React.useState<Record<number, boolean>>({})

  const handleSelectedSubcategory = (subCategoryId: number) => {
    setSelectedSubcategory((prev) => ({ ...prev, [subCategoryId]: !prev[subCategoryId] }))
  }

  return (
    <>
      {filteredSubcategories.map(({ subCategoryName, subCategoryId }) => (
        <React.Fragment key={`${subCategoryId}.${subCategoryName}`}>
          <CheckboxWrapper key={subCategoryId}>
            <PolymorphicInput
              label={subCategoryName}
              type="checkbox"
              name={subCategoryName}
              checked={!!selectedSubcategory?.[subCategoryId]}
              onChange={() => handleSelectedSubcategory(subCategoryId)}
              id={subCategoryId}
            />
          </CheckboxWrapper>

          {selectedSubcategory?.[subCategoryId] && <SubProducts subCategoryId={subCategoryId} />}
        </React.Fragment>
      ))}
    </>
  )
}

export default SubcategoriesListView
