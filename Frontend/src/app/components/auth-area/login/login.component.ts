import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { async } from "rxjs";
import { CredentialModel } from "src/app/models/credentials.model";
import { authStore } from "src/app/redux/auth-state";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
})
export class LoginComponent {
    public credentials = new CredentialModel();

    constructor(private authService: AuthService, private router: Router) {}

    public async login(): Promise<void> {
        try {
            await this.authService.login(this.credentials);
            authStore.getState().user.role.role === 'admin' ?
            this.router.navigateByUrl("/admin") :
            this.router.navigateByUrl("/home");
            // todo - toaster
            console.log("logged in");
        } catch (err: any) {
            // todo - toaster
            console.log(err);
        }
    }
}
