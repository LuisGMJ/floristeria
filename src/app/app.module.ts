import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

// Ngx-Toastr
import { ToastrModule } from 'ngx-toastr';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { environment } from '../environments/environment';

// Ngx-Bootstrap
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CarouselComponent } from './components/shared/carousel/carousel.component';
import { FlipBookComponent } from './components/shared/flip-book/flip-book.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { MapsComponent } from './components/shared/maps/maps.component';
import { ModalComponent } from './components/shared/modal/modal.component';
import { PaginationComponent } from './components/shared/pagination/pagination.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { DetailsComponent } from './components/pages/details/details.component';
import { AboutComponent } from './components/pages/about/about.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { UploadImageComponent } from './components/admin/upload-image/upload-image.component';
import { ProductFormComponent } from './components/admin/product-form/product-form.component';
import { GalleryComponent } from './components/admin/gallery/gallery.component';
import { GalleryModalComponent } from './components/admin/gallery-modal/gallery-modal.component';
import { ListProductsComponent } from './components/admin/list-products/list-products.component';

import { SafeDomPipe } from './pipes/safe-dom.pipe';

import { ScrollableDirective } from './directives/scrollable.directive';
import { NoImagePipe } from './pipes/no-image.pipe';
import { ImageFormComponent } from './components/admin/image-form/image-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarouselComponent,
    FlipBookComponent,
    FooterComponent,
    LoadingComponent,
    MapsComponent,
    ModalComponent,
    PaginationComponent,
    HomeComponent,
    SafeDomPipe,
    ProductsComponent,
    DetailsComponent,
    AboutComponent,
    AdminHomeComponent,
    UploadImageComponent,
    ProductFormComponent,
    GalleryComponent,
    ScrollableDirective,
    GalleryModalComponent,
    ListProductsComponent,
    NoImagePipe,
    ImageFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    CollapseModule,
    CarouselModule,
    ProgressbarModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    ReactiveFormsModule,
    ScrollingModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
