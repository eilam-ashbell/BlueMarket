import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class UtilsService {
    constructor(private http: HttpClient) {}

    //   Get products count in the shop
    public async getProductsCount(): Promise<number> {
        const productsCount = await firstValueFrom(
            this.http.get<number>(environment.productsRoute + "count")
        );
        return productsCount;
    }

    //   Get orders count in the shop
    public async getOrdersCount(): Promise<number> {
        const ordersCount = await firstValueFrom(
            this.http.get<number>(environment.utilsRoute + "orders/count")
        );
        return ordersCount;
    }
}
