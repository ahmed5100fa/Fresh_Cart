export interface Cart {
  status: string
  numOfCartItems: number
  cartId: string
  data: CartData
}

export interface CartData {
  _id: string
  cartOwner: string
  products: Product[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

export interface Product {
  count: number
  _id: string
  product: Product2
  price: number
}

export interface Product2 {
  subcategory: Subcategory[]
  _id: string
  title: string
  imageCover: string
  category: Category
  brand: Brand
  ratingsAverage: number
  id: string
}

export interface Subcategory {
  _id: string
  name: string
  slug: string
  category: string
}

export interface Category {
  _id: string
  name: string
  slug: string
  image: string
}

export interface Brand {
  _id: string
  name: string
  slug: string
  image: string
}

export interface ClearRes {
  message : string
}

export interface shippingAddress{
  details : string,
  phone : string,
  city : string,
}

export interface CheckoutResponse {
  session: {
    url: string;
    success_url: string;
    cancel_url: string;
  };
}

export interface WishInter {
  status: string
  message: string
  data: string[]
}
