import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import {
    AbstractControl,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { UserModel } from "src/app/models/user-model";
import { AuthService } from "src/app/services/auth.service";
import { NotifyService } from "src/app/services/notify.service";
@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
    constructor(
        private authService: AuthService,
        private router: Router,
        private notifyService: NotifyService
    ) {}

    // Define start step in the form
    public currentStep = 0;
    // Define reactive form
    public form = new FormGroup({
        accountDetails: new FormGroup({
            identityNum: new FormControl(
                "",
                [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(20),
                ],
                [this.idNumberNotExist.bind(this)]
            ),
            email: new FormControl(
                "",
                [Validators.required, Validators.email],
                [this.emailNotExist.bind(this)]
            ),
            password: new FormControl(
                "",
                [Validators.required],
                [this.validatePasswordPattern.bind(this)]
            ),
            passwordConfirm: new FormControl("", [
                Validators.required,
                this.passwordMatchValidator,
            ]),
        }),
        personalDetails: new FormGroup({
            city: new FormControl("", [Validators.required]),
            street: new FormControl("", [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(500),
            ]),
            firstName: new FormControl("", [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(50),
            ]),
            lastName: new FormControl("", [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(50),
            ]),
        }),
    });

    // Costume validator for password confirmation
    private passwordMatchValidator(c: AbstractControl) {
        return c.parent?.get("passwordConfirm").value ===
            c.parent?.get("password").value
            ? null
            : { mismatch: true };
    }
    // Costume validator for password pattern
    private async validatePasswordPattern(c: AbstractControl) {
        const validation = await this.checkPasswordValidation(c.value);
        c.parent?.get("passwordConfirm").reset();
        return this.checkPasswordValidation(c.value).length === 0
            ? null
            : { pattern: validation };
    }
    // Costume validator for user id number confirmation
    private async idNumberNotExist(control: AbstractControl) {
        const response = await this.authService.checkIdNumber(control.value);
        return response ? { idExist: true } : null;
    }
    // Costume validator for user email confirmation
    private async emailNotExist(control: AbstractControl) {
        const response = await this.authService.checkEmail(control.value);
        return response ? { emailExist: true } : null;
    }

    // continue to next step in the form
    public next(): void {
        this.currentStep += 1;
    }
    // return to last step in the form
    public prev(): void {
        this.currentStep -= 1;
    }
    // submit form data
    public async submit(): Promise<void> {
        try {
            // check if all form values are valid
            if (!this.form.valid) {
                this.form.markAllAsTouched();
                return;
            }
            // build user model for submit
            const user = new UserModel(
                Object.assign(
                    this.form.value.accountDetails,
                    this.form.value.personalDetails
                ) as UserModel
            );
            // submit registration
            await this.authService.register(user);
            this.notifyService.success(
                user.firstName + ", you are officially one of us!"
            );
            this.router.navigate(["/home"]);
        } catch (err: any) {
            this.notifyService.error(err);
            console.log(err);
            this.currentStep = 0;
        }
    }

    // Check validation for specific FormGroup
    public isValid(index: number): boolean {
        const groups = Object.keys(this.form.controls).map((groupName) =>
            this.form.get(groupName)
        ) as FormGroup[];
        return groups[index]?.valid;
    }
    // Get current FormGroup
    public get currentGroup(): FormGroup {
        return this.getGroupAt(this.currentStep);
    }
    // Get FormGroup by index
    private getGroupAt(index: number): FormGroup {
        const groups = Object.keys(this.form.controls).map((groupName) =>
            this.form.get(groupName)
        ) as FormGroup[];
        return groups[index];
    }

    public checkPasswordValidation(value: string): string[] {
        const messages: string[] = [];
        const isWhitespace = /^(?=.*\s)/;
        if (isWhitespace.test(value)) {
            messages.push("Password must not contain white-spaces.");
        }
        const isContainsUppercase = /^(?=.*[A-Z])/;
        if (!isContainsUppercase.test(value)) {
            messages.push(
                "Password must have at least one uppercase character"
            );
        }
        const isContainsLowercase = /^(?=.*[a-z])/;
        if (!isContainsLowercase.test(value)) {
            messages.push(
                "Password must have at least one lowercase character"
            );
        }
        const isContainsNumber = /^(?=.*[0-9])/;
        if (!isContainsNumber.test(value)) {
            messages.push("Password must contain at least one digit");
        }
        const isContainsSymbol =
            /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
        if (!isContainsSymbol.test(value)) {
            messages.push("Password must contain at least one special symbol");
        }
        const isValidLength = /^.{6,32}$/;
        if (!isValidLength.test(value)) {
            messages.push("Password must be 6-32 characters Long");
        }
        return messages;
    }
}
