import {
    Component,
    DoCheck,
    OnChanges,
    OnInit,
    SimpleChanges,
} from "@angular/core";
import { UserModel } from "src/app/models/user-model";
import { authStore } from "src/app/redux/auth-state";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements DoCheck {
    public userData: UserModel = authStore.getState().user;

    constructor(private authService: AuthService) {}

    ngDoCheck(): void {
        authStore.getState().token ?
        this.userData = authStore.getState().user :
        this.userData = null;
    }

    public async logout(): Promise<void> {
        console.log("logout");
        await this.authService.logout();
    }
}
