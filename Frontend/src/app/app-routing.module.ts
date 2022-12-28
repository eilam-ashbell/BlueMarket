import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminPageComponent } from "./components/admin-area/admin-page/admin-page.component";
import { LoginComponent } from "./components/auth-area/login/login.component";
import { LogoutComponent } from "./components/auth-area/logout/logout.component";
import { RegisterComponent } from "./components/auth-area/register/register.component";
import { LandingComponent } from "./components/home-area/landing/landing.component";
import { PageNotFoundComponent } from "./components/layout-area/page-not-found/page-not-found.component";
import { OrderPageComponent } from "./components/order-area/order-page/order-page.component";
import { ProductsListComponent } from "./components/products-area/products-list/products-list.component";
import { RoleGuardService } from "./services/role-guard.service";

const routes: Routes = [
    // Auth routes
    { path: "guest", component: LandingComponent },
    { path: "register", component: RegisterComponent },
    { path: "logout", component: LogoutComponent },
    { path: "order/:cartId", component: OrderPageComponent },
    // Main route
    { path: "", redirectTo: "/home", pathMatch: "full" },
    {
        path: "home",
        component: ProductsListComponent,
        canActivate: [RoleGuardService],
        data: {
            roleAccess: "user",
        },
    },
    {
        path: "admin",
        component: AdminPageComponent,
        canActivate: [RoleGuardService],
        data: {
            roleAccess: "admin",
        },
    },
    // Page not found route
    { path: "**", component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
