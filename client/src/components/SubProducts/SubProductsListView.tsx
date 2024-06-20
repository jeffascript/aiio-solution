import CheckboxWrapper from '@/molecules/CheckboxWrapper'
import React, { useCallback, useMemo } from 'react'

import subProducts from '../../../public/data/subproducts.json'
import PolymorphicInput from '@/atoms/PolyMorphicInput'

import { useToggleItem } from '@/hooks/useToggleItem'
import CheckboxInput from '@/atoms/CheckboxInput'

const SubproductsListView = ({
  subCategoryId,
  children,
}: {
  subCategoryId: number
  children?: React.ReactNode
}) => {
  const { handleToggleSelectedItem, selectedItem } = useToggleItem('subproducts')

  const getFilteredData = useCallback(() => {
    return subCategoryId
      ? subProducts.subproducts.filter((subcategory) => subcategory.subCategoryId === subCategoryId)
      : []
  }, [])

  const initialFilteredSubProducts = useMemo(() => getFilteredData(), [getFilteredData])

  const [processedSubProducts, setProcessedSubProducts] = React.useState(
    () => initialFilteredSubProducts
  )

  const refetchOnSearch = React.useCallback(
    (query: string) => {
      const lowerCaseQuery = query.toLowerCase()
      setProcessedSubProducts(
        initialFilteredSubProducts.filter(({ subProductName }) =>
          subProductName.toLowerCase().includes(lowerCaseQuery)
        )
      )
    },
    [setProcessedSubProducts]
  )

  return (
    <>
      {processedSubProducts.map(({ subProductId, subProductName }) => (
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
