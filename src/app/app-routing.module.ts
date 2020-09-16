import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { DetailsComponent } from './components/pages/details/details.component';
import { AboutComponent } from './components/pages/about/about.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { ProductFormComponent } from './components/admin/product-form/product-form.component';
import { GalleryComponent } from './components/admin/gallery/gallery.component';
import { ListProductsComponent } from './components/admin/list-products/list-products.component';
import { ImageFormComponent } from './components/admin/image-form/image-form.component';


const routes: Routes = [
  { path: 'inicio', component: HomeComponent },
  { path: 'productos/:id', component: ProductsComponent },
  { path: 'detalles/:id', component: DetailsComponent },
  { path: 'nosotros', component: AboutComponent },
  {
    path: 'admin',
    component: AdminHomeComponent,
    children: [
      { path: 'productos', component: ListProductsComponent },
      { path: 'galeria', component: GalleryComponent },
      { path: 'galeria/editar/:id', component: ImageFormComponent },
      { path: 'nuevo', component: ProductFormComponent },
      { path: 'editar/:id', component: ProductFormComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'productos' }
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
