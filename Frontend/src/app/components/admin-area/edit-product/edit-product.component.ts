import { Component, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CategoryModel } from "src/app/models/category.model";
import { ProductModel } from "src/app/models/product.model";
import { ProductsService } from "src/app/services/products.service";
import { environment } from "src/environments/environment";

@Component({
    selector: "app-edit-product",
    templateUrl: "./edit-product.component.html",
    styleUrls: ["./edit-product.component.css"],
})
export class EditProductComponent {
    @Input() categories: CategoryModel[];

    public product: ProductModel;
    // todo - add placeholder image
    public imgPath: string;

    constructor(private productService: ProductsService) {}

    ngOnInit() {
        this.productService.productToWatch.subscribe((data) => {
            this.form.markAsUntouched()
            this.form.controls._id.setValue(data?._id);
            this.form.controls.name.setValue(data?.name);
            this.form.controls.price.setValue(data?.price.toString());
            this.form.controls.categoryId.setValue(data?.categoryId);
            this.form.controls.imageName.setValue(data?.imageName);
            this.imgPath = environment.staticsRoute + data?.imageName;
            // this.form.controls.image.setValue(this.imgPath);
        });
    }

    public form = new FormGroup({
        _id: new FormControl("", [Validators.required]),
        name: new FormControl("", [Validators.required]),
        price: new FormControl("", [Validators.required]),
        categoryId: new FormControl("", [Validators.required]),
        imageName: new FormControl("", [Validators.required]),
        image: new FormControl("", []),
    });

    public onImageChange() {
        console.log('change');
        
        // const files = this.form.controls.image.value
        const file = this.form.controls.image.value
        console.log(file);
        
        // setImage(URL.createObjectURL(file))
    }

    public async saveProduct() {
        // check if all form values are valid
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }
        console.log(this.form.value);
        // todo - remove value from productToWatch
    }
}
