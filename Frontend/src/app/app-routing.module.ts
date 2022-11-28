import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/auth-area/login/login.component";
import { LogoutComponent } from "./components/auth-area/logout/logout.component";
import { RegisterComponent } from "./components/auth-area/register/register.component";
import { HomeComponent } from "./components/home-area/home/home.component";
import { PageNotFoundComponent } from "./components/layout-area/page-not-found/page-not-found.component";
import { ProductsListComponent } from "./components/products-area/products-list/products-list.component";
import { RoleGuardService } from "./services/role-guard.service";

const routes: Routes = [
    // Auth routes
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "logout", component: LogoutComponent },
    // Main route
    { path: "", redirectTo: "/home", pathMatch: "full" },
    {
        path: "home",
        component: HomeComponent,
    },
    {
        path: "products",
        component: ProductsListComponent,
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
