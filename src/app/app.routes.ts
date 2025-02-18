import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { NotFoundComponent } from './layout/additions/not-found/not-found.component';
import { authGuard } from './shared/gaurdes/auth/auth.guard';
import { prevLinkGaurd } from './shared/gaurdes/prevLink/prev-link.guard';
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'cart', component: CartComponent, canActivate: [authGuard], title: 'Cart' },
  { path: 'category', loadComponent : () => import('./layout/pages/categories/categories.component').then((c) => c.CategoriesComponent), title: 'Category' },
  { path: 'forgotPassword', loadComponent : () => import('./layout/additions/forgetPassword/forget-password/forget-password.component').then((c) => c.ForgetPasswordComponent),canActivate: [prevLinkGaurd], title: 'ForgetPassword' },
  { path: 'login', component: LoginComponent, canActivate: [prevLinkGaurd], title: 'Login' },
  { path: 'register', component: RegisterComponent, canActivate: [prevLinkGaurd], title: 'Register' },
  { path: 'shippingAddress/:CartId', loadComponent : () => import('./layout/additions/shipingAddress/shiping-address/shiping-address.component').then((c) => c.ShipingAddressComponent), title: 'ShippingAddress' },
  { path: 'brand', loadComponent : () => import('./layout/pages/brand/brand.component').then((c) => c.BrandComponent), title: 'Brand' },
  { path: 'allOrder/:Userid', loadComponent : () => import('./layout/additions/all-orders/all-orders.component').then((c) => c.AllOrdersComponent), title: 'allOrders' },
  { path: 'wishList', loadComponent : () => import('./layout/additions/wish-list/wish-list.component').then((c) => c.WishListComponent) , canActivate: [authGuard] , title: 'WishList' },
  { path: 'proCategory/:catId', loadComponent : () => import('./layout/additions/prodep-cat/prodep-cat.component').then((c) => c.ProdepCatComponent), title: 'productCategory' },
  { path: 'proBrand/:brandId', loadComponent : () => import('./layout/additions/prodeponbrand/prodeponbrand.component').then((c) => c.ProdeponbrandComponent), title: 'productBrand' },
  { path: 'details/:id', loadComponent : () => import('./layout/additions/product-details/product-details.component').then((c) => c.ProductDetailsComponent), title: 'Product Details' },
  { path: '**', component: NotFoundComponent, title: 'Not Found' },
];


