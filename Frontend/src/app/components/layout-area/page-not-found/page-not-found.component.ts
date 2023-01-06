import { Component } from "@angular/core";
import { authStore } from "src/app/redux/auth-state";

@Component({
    selector: "app-page-not-found",
    templateUrl: "./page-not-found.component.html",
    styleUrls: ["./page-not-found.component.css"],
})
export class PageNotFoundComponent {
    public role = authStore.getState().user.role.role;
}
