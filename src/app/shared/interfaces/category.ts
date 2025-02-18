export interface Category {
  results: number
  metadata: Metadata
  data: Data[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
}

export interface Data {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}
export interface SubCategory {
  results: number
  metadata: Metadata
  data: Daum[]
}

export interface Daum {
  _id: string
  name: string
  slug: string
  category: string
  createdAt: string
  updatedAt: string
}

