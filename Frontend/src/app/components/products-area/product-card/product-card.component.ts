import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

    @Input() product: ProductModel;
    public imagePath: string;
    public quantity: number = 1;


  constructor() { }

  ngOnInit(): void {
    this.imagePath = environment.staticsRoute + this.product.imageName;
  }


  public increaseQuantity() {
    this.quantity++
  }
  public decreaseQuantity() {
    this.quantity === 1 ? this.quantity = 1 : this.quantity--
  }
}
