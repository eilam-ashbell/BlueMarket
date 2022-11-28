import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { MenuComponent } from './components/layout-area/menu/menu.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { AddDataComponent } from './components/data-area/add-data/add-data.component';
import { ListDataComponent } from './components/data-area/list-data/list-data.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductCardComponent } from './components/products-area/product-card/product-card.component';
import { ProductsListComponent } from './components/products-area/products-list/products-list.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { RequireAuthComponent } from './components/auth-area/require-auth/require-auth.component';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { JwtModule } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';

export function tokenGetter() {
    return localStorage.getItem("token");
  }

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    MenuComponent,
    HomeComponent,
    AddDataComponent,
    ListDataComponent,
    ProductCardComponent,
    ProductsListComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    RequireAuthComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: [environment.utilsRoute],
          disallowedRoutes: [],
        },
      }),
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
