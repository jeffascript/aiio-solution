export type Products = {
  products: Product[]
}

export type Product = {
  productId: number
  productName: string
}

export type SubCategories = {
  subcatergories: Subcatergory[]
}

export type Subcatergory = {
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
  allSubcategories: Subcatergory[]
  allSubproducts: Subproduct[]
  isLoading: boolean
  error: string | null
}
