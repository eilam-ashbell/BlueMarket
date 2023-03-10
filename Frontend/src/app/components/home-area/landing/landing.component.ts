import { Component, OnInit } from "@angular/core";
import { NotifyService } from "src/app/services/notify.service";
import { UtilsService } from "src/app/services/utils.service";

@Component({
    selector: "app-landing",
    templateUrl: "./landing.component.html",
    styleUrls: ["./landing.component.css"],
})
export class LandingComponent implements OnInit {
    public productsCount: number;
    public ordersCount: number;
    public showRegister: boolean = false;

    constructor(
        private utilsService: UtilsService,
        private notifyService: NotifyService
    ) {}

    async ngOnInit(): Promise<void> {
        try {
            this.productsCount = await this.utilsService.getProductsCount();
            this.ordersCount = await this.utilsService.getOrdersCount();
        } catch (err: any) {
            this.notifyService.error(err);
        }
    }
}
