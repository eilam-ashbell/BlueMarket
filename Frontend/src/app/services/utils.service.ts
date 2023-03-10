import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { jsPDF } from "jspdf";
import { v4 as uuid } from "uuid";
import { BusyDate } from "../models/busy-date.model";
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

    // Get all dates that have 3 deliveries and more
    public async getBusyDates(): Promise<BusyDate[]> {
        const busyDates = await firstValueFrom(
            this.http.get<BusyDate[]>(environment.ordersRoute + "delivery/busy")
        );
        return busyDates;
    }

    exportCartToPDF(elements: HTMLElement) {
        const doc = new jsPDF({
            unit: "px",
            format: [595, 842],
        });
        doc.html(elements, {
            callback: (doc: jsPDF) => {
                doc.output("dataurlnewwindow");
                const fileName = uuid() + ".pdf";
            },
        });
    }
}
