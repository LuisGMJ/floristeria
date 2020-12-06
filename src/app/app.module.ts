import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { ScrollingModule } from '@angular/cdk/scrolling';

// angular-material
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';

// Ngx-Toastr
import { ToastrModule } from 'ngx-toastr';

// Ngx-input-file
import { InputFileConfig, InputFileModule } from 'ngx-input-file';

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

import { NgxImageZoomModule } from 'ngx-image-zoom';

import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CarouselComponent } from './components/shared/carousel/carousel.component';
import { FlipBookComponent } from './components/shared/flip-book/flip-book.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { MapsComponent } from './components/shared/maps/maps.component';
import { ModalComponent } from './components/shared/modal/modal.component';
import { PaginationComponent } from './components/shared/pagination/pagination.component';
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
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { HomeComponent } from './components/public/home/home.component';
import { ProductsComponent } from './components/public/products/products.component';
import { DetailsComponent } from './components/public/details/details.component';
import { AboutComponent } from './components/public/about/about.component';
import { PublicComponent } from './components/public/public.component';
import { SidebarComponent } from './components/admin/shared/sidebar/sidebar.component';
import { APP_BASE_HREF } from '@angular/common';
import { ImageModalComponent } from './components/shared/image-modal/image-modal.component';

const config: InputFileConfig = {};

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
    ImageFormComponent,
    LoginComponent,
    RegisterComponent,
    PublicComponent,
    SidebarComponent,
    ImageModalComponent
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
    ToastrModule.forRoot(),
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    InputFileModule.forRoot(config),
    MatSelectModule,
    NgxImageZoomModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
