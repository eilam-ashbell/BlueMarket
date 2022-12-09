import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
    selector: "app-personal-details",
    templateUrl: "./personal-details.component.html",
    styleUrls: ["./personal-details.component.css"],
})
export class PersonalDetailsComponent implements OnInit {
    @Input() public personalDetails: FormGroup;

    public get city() {
        return this.personalDetails.get("city");
    }
    public get street() {
        return this.personalDetails.get("street");
    }
    public get firstName() {
        return this.personalDetails.get("firstName");
    }
    public get lastName() {
        return this.personalDetails.get("lastName");
    }

    public cities: string[] = ['Jerusalem', "Tel Aviv", "Haifa", 'Petah Tikva', "Ashdod", "Rishon LeZiyyon", "Bnei Brak", "Holon", "Beer Sheba", "Ramat Gan", "Ashqelon"]

    constructor() {}

    ngOnInit(): void {}
}
