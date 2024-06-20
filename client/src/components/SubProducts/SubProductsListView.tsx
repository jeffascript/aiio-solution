import CheckboxWrapper from '@/molecules/CheckboxWrapper'
import React from 'react'

import subProducts from '../../../public/data/subproducts.json'
import PolymorphicInput from '@/atoms/PolyMorphicInput'
import { Subcategories } from '@/components/Subcategories'
import SubProducts from '../SubProducts/SubProducts'

const SubproductsListView = ({
  subCategoryId,
  children,
}: {
  subCategoryId: number
  children?: React.ReactNode
}) => {
  const filteredSubProducts = subProducts.subproducts.filter(
    (subcategory) => subcategory.subCategoryId === subCategoryId
  )

  const [selectedSubcategory, setSelectedSubproduct] = React.useState<Record<number, boolean>>({})

  const handleSelectedSubproduct = (subCategoryId: number) => {
    setSelectedSubproduct((prev) => ({ ...prev, [subCategoryId]: !prev[subCategoryId] }))
  }

  return (
    <>
      {filteredSubProducts.map(({ subProductId, subProductName }) => (
        <React.Fragment key={`${subProductId}.${subProductName}`}>
          <CheckboxWrapper innermostCheckbox>
            <PolymorphicInput
              type="checkbox"
              label={subProductName}
              name={subProductName}
              checked={!!selectedSubcategory?.[subProductId]}
              onChange={() => handleSelectedSubproduct(subProductId)}
              id={subProductId}
            />
          </CheckboxWrapper>
        </React.Fragment>
      ))}
    </>
  )
}

export default SubproductsListView
