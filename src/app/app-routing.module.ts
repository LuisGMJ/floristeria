import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { DetailsComponent } from './components/pages/details/details.component';
import { AboutComponent } from './components/pages/about/about.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';


const routes: Routes = [
  { path: 'inicio', component: HomeComponent },
  { path: 'productos/:id', component: ProductsComponent },
  { path: 'detalles/:id', component: DetailsComponent },
  { path: 'nosotros', component: AboutComponent },
  { path: 'admin', component: AdminHomeComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
