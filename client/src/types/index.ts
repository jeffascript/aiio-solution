export type Products = {
  products: Product[]
}

export type Product = {
  productId: number
  productName: string
}

export type SubCategories = {
  subcategories: Subcategory[]
}

export type Subcategory = {
  productId: number
  subCategoryId: number
  subCategoryName: string
}

export type Subproducts = {
  subproducts: Subproduct[]
}

export type Subproduct = {
  subCategoryId: number
  subProductId: number
  subProductName: string
}

export type ProductsContext = {
  allProducts: Product[]
  allSubcategories: Subcategory[]
  allSubproducts: Subproduct[]
  isLoading: boolean
  error: string | null
  updateCacheKeySuffixForRefetchingData: (suffix: string) => void
}

export interface SubcatergoriesContext {
  filteredSubcategories: Array<Subcategory>
  setFilteredSubcategories: React.Dispatch<React.SetStateAction<Subcategory[]>>
  handleSubcategorySearch: (query: string) => void
}

export interface SubproductsContext {
  filteredSubProducts: Array<Subproduct>
  setFilteredSubProducts: React.Dispatch<React.SetStateAction<Subproduct[]>>
  handleSubproductSearch: (query: string) => void
  isNewItemFormOpen: boolean
  setIsNewItemFormOpen: React.Dispatch<React.SetStateAction<boolean>>
  inputValue: string
  setInputValue: React.Dispatch<React.SetStateAction<string>>
  handleNewItem: () => void
}

export type AllData = Record<
  keyof Products | keyof SubCategories | keyof Subproducts,
  Record<string, boolean>
>

export type DoneResultAsNode = {
  [key: string]: {
    [key: string]: string[]
  }[]
}
export type DoneResult = {
  selectedSubproducts: string[]
  selectedSubcategories: string[]
  selectedProducts: string[]
}
