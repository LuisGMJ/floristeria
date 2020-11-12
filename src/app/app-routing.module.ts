import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { ProductFormComponent } from './components/admin/product-form/product-form.component';
import { GalleryComponent } from './components/admin/gallery/gallery.component';
import { ListProductsComponent } from './components/admin/list-products/list-products.component';
import { ImageFormComponent } from './components/admin/image-form/image-form.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';

import { AuthGuard } from './guards/auth.guard';
import { PublicComponent } from './components/public/public.component';
import { HomeComponent } from './components/public/home/home.component';
import { ProductsComponent } from './components/public/products/products.component';
import { DetailsComponent } from './components/public/details/details.component';
import { AboutComponent } from './components/public/about/about.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminHomeComponent,
    children: [
      { path: 'productos', component: ListProductsComponent },
      { path: 'galeria', component: GalleryComponent },
      { path: 'galeria/editar/:id', component: ImageFormComponent },
      { path: 'nuevo', component: ProductFormComponent },
      { path: 'editar/:id', component: ProductFormComponent },
      { path: 'register', component: RegisterComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'productos' },
    ], canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: 'inicio', component: HomeComponent },
      { path: 'productos/:id', component: ProductsComponent },
      { path: 'producto/:id/detalles', component: DetailsComponent },
      { path: 'nosotros', component: AboutComponent },
      { path: '**', pathMatch: 'full', redirectTo: '/inicio' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
