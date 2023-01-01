import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { CategoryModel } from "src/app/models/category.model";
import { ProductModel } from "src/app/models/product.model";
import { NotifyService } from "src/app/services/notify.service";
import { ProductsService } from "src/app/services/products.service";
import { environment } from "src/environments/environment";
@Component({
    selector: "app-edit-product",
    templateUrl: "./edit-product.component.html",
    styleUrls: ["./edit-product.component.css"],
})
export class EditProductComponent {
    @Input() categories: CategoryModel[];
    
    public product = new ProductModel();
    public imgPath: string;

    @ViewChild("productImage")
    public productImage: ElementRef<HTMLInputElement>;
    @ViewChild("productForm")
    public productForm: ElementRef<HTMLFormElement>;

    constructor(
        private productService: ProductsService,
        private notifyService: NotifyService,
        private router: Router
    ) {}

    ngOnInit() {
        this.productService.productToWatch.subscribe((data) => {
            this.product._id = data?._id;
            this.product.name = data?.name;
            this.product.price = data?.price;
            this.product.categoryId = data?.categoryId;
            this.product.imageName = data?.imageName;
            this.imgPath = data?.imageName
                ? environment.staticsRoute + data?.imageName
                : "./../../../../assets/images/imagePlaceholder.svg";
        });
    }

    public onImageChange() {
        const file = this.productImage.nativeElement.files.item(0);
        this.imgPath = URL.createObjectURL(file);
        this.productForm.nativeElement;
    }

    public cancelEdit() {
        this.productService.clearProductToEdit();
    }

    public resetForm(form: NgForm) {
        form.resetForm();
        this.productImage.nativeElement.value = null;
        this.imgPath = "./../../../../assets/images/imagePlaceholder.svg";
    }

    public saveProduct(form: NgForm) {
        this.product.image = this.productImage.nativeElement.files.item(0);
        if (this.product._id) {
            // edit mode
            this.productService.updateProduct(this.product);
            this.notifyService.success("changes ha been saved");
        } else {
            // new product mode
            this.productService.addProduct(this.product);
            this.notifyService.success("product has been added");
        }
        // todo - handle page reload
        window.location.reload()
        // remove value from productToWatch
        this.productService.clearProductToEdit();
        // reset form state
        form.resetForm();
    }
}
