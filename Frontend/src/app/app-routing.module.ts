import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDataComponent } from './components/data-area/add-data/add-data.component';
import { ListDataComponent } from './components/data-area/list-data/list-data.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { ProductCardComponent } from './components/products-area/product-card/product-card.component';
import { ProductsListComponent } from './components/products-area/products-list/products-list.component';

const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "products", component: ProductsListComponent },
    { path: "list", component: ListDataComponent },
    { path: "add", component: AddDataComponent },
    { path: "", redirectTo: "/home", pathMatch: "full" },
    // { path: "**", component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
