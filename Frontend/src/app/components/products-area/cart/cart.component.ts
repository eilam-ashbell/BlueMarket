import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CartModel } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    public cart: CartModel //= new CartModel()

  constructor(private cartService: CartService) { 
  }

  async ngOnInit(): Promise<void> {
    // Get current cart
    const currentCart = await this.cartService.getCurrentCart();
    this.cart = currentCart
    // Create new cart if there is no cart
    if (!this.cart) {
        this.cart = await this.cartService.createNewCart()
    }
  }

}
