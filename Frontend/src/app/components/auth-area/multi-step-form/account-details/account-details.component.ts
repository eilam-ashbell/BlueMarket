import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
    selector: "app-account-details",
    templateUrl: "./account-details.component.html",
    styleUrls: ["./account-details.component.css"],
})
export class AccountDetailsComponent implements OnInit {
    @Input() public accountDetails: FormGroup;

    public get identityNum() {
        return this.accountDetails.get("identityNum");
    }
    public get email() {
        return this.accountDetails.get("email");
    }
    public get password() {
        return this.accountDetails.get("password");
    }
    public get passwordConfirm() {
        return this.accountDetails.get("passwordConfirm");
    }

    constructor() {}

    ngOnInit(): void {}
}

export abstract class FormProvider {
    abstract getForm(): FormGroup;
}
