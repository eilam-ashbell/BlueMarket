import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { LayoutComponent } from "./components/layout-area/layout/layout.component";
import { HeaderComponent } from "./components/layout-area/header/header.component";
import { MenuComponent } from "./components/layout-area/menu/menu.component";
import { HomeComponent } from "./components/home-area/home/home.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ProductCardComponent } from "./components/products-area/product-card/product-card.component";
import { ProductsListComponent } from "./components/products-area/products-list/products-list.component";
import { LoginComponent } from "./components/auth-area/login/login.component";
import { LogoutComponent } from "./components/auth-area/logout/logout.component";
import { RegisterComponent } from "./components/auth-area/register/register.component";
import { RequireAuthComponent } from "./components/auth-area/require-auth/require-auth.component";
import { PageNotFoundComponent } from "./components/layout-area/page-not-found/page-not-found.component";
import { JwtModule } from "@auth0/angular-jwt";
import { environment } from "src/environments/environment";
import { CartComponent } from "./components/products-area/cart/cart.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ProductCartCardComponent } from "./components/products-area/product-cart-card/product-cart-card.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AccountDetailsComponent } from "./components/auth-area/multi-step-form/account-details/account-details.component";
import { PersonalDetailsComponent } from "./components/auth-area/multi-step-form/personal-details/personal-details.component";
import { OrderPageComponent } from "./components/order-area/order-page/order-page.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { DatepickerComponent } from './components/order-area/datepicker/datepicker.component';

export function tokenGetter() {
    return localStorage.getItem("token");
}

@NgModule({
    declarations: [
        LayoutComponent,
        HeaderComponent,
        MenuComponent,
        HomeComponent,
        ProductCardComponent,
        ProductsListComponent,
        LoginComponent,
        LogoutComponent,
        RegisterComponent,
        RequireAuthComponent,
        PageNotFoundComponent,
        CartComponent,
        ProductCartCardComponent,
        AccountDetailsComponent,
        PersonalDetailsComponent,
        OrderPageComponent,
        DatepickerComponent,
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
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
    ],
    providers: [],
    bootstrap: [LayoutComponent],
})
export class AppModule {}
