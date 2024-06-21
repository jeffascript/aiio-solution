import { useCallback, useState } from 'react'
import type { AllData, DoneResult, DoneResultAsNode } from '@/types'

export const useProcessSelectedData = () => {
  const [doneResultAsNode, setDoneResultAsNode] = useState<DoneResultAsNode>({})
  const [doneResult, setDoneResult] = useState<DoneResult>({
    selectedSubproducts: [],
    selectedSubcategories: [],
    selectedProducts: [],
  })

  console.log(doneResult, 'CALC')

  const processAllSelectedData = useCallback((data: AllData) => {
    const newResult: DoneResultAsNode = {}
    const newDoneResult: DoneResult = {
      selectedSubproducts: [],
      selectedSubcategories: [],
      selectedProducts: [],
    }

    // Check if data is empty
    if (Object.keys(data).length === 0) {
      setDoneResultAsNode(newResult)
      setDoneResult(newDoneResult)
      return
    }

    // Destructure data with default empty objects
    const {
      products: selectedProducts = {},
      subcategories: selectedSubcategories = {},
      subproducts: selectedSubproducts = {},
    } = data

    // Iterate over selectedProducts
    for (const [productKey, productValue] of Object.entries(selectedProducts)) {
      if (!productValue) continue // Ignore falsy values

      const productId = productKey.split('-')[0]
      newResult[productKey] = []
      newDoneResult.selectedProducts.push(productKey.split('-').pop()!)

      // Iterate over selectedSubcategories
      for (const [subCategoryKey, subCategoryValue] of Object.entries(selectedSubcategories)) {
        if (!subCategoryValue) continue // Ignore falsy values

        const [subCategoryProductId, subCategoryId] = subCategoryKey.split('-')
        if (subCategoryProductId !== productId) continue // Ensure it belongs to the current product

        const subCategoryObj: { [key: string]: string[] } = {}
        subCategoryObj[subCategoryKey] = []

        // Iterate over selectedSubproducts
        for (const [subProductKey, subProductValue] of Object.entries(selectedSubproducts)) {
          if (!subProductValue) continue // Ignore falsy values

          const [subProductSubCategoryId] = subProductKey.split('-')
          if (subProductSubCategoryId !== subCategoryId) continue // Ensure it belongs to the current subcategory

          subCategoryObj[subCategoryKey].push(subProductKey)
          newDoneResult.selectedSubproducts.push(subProductKey.split('-').pop()!)
        }

        newResult[productKey].push(subCategoryObj)
        newDoneResult.selectedSubcategories.push(subCategoryKey.split('-').pop()!)
      }
    }

    setDoneResultAsNode(newResult)
    setDoneResult(newDoneResult)
  }, [])

  return { doneResultAsNode, doneResult, processAllSelectedData }
}
