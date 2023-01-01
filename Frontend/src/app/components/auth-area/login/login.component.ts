import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { async } from "rxjs";
import { CredentialModel } from "src/app/models/credentials.model";
import { authStore } from "src/app/redux/auth-state";
import { AuthService } from "src/app/services/auth.service";
import { NotifyService } from "src/app/services/notify.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
})
export class LoginComponent {

    public credentials = new CredentialModel();
    public passwordRegex: RegExp = this.authService.passwordRegex;

    constructor(private authService: AuthService, private router: Router, private notifyService: NotifyService) {}

    public async login(): Promise<void> {
        try {
            await this.authService.login(this.credentials);
            authStore.getState().user.role.role === 'admin' ?
            this.router.navigateByUrl("/admin") :
            this.router.navigateByUrl("/home");
            this.notifyService.success('Welcome back ' + authStore.getState().user.firstName)
        } catch (err: any) {
            this.notifyService.error(err)
        }
    }

    public validatePasswordPattern() {
        const validation = this.authService.checkPasswordValidation(this.credentials.password)
        return validation
    }
}
