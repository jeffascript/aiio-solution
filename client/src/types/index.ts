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
}
