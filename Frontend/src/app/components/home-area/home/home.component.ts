import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialModel } from 'src/app/models/credentials.model';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public productsCount: number;
    public ordersCount: number;
    public credentials = new CredentialModel();

  constructor(private utilsService: UtilsService, private authService: AuthService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.productsCount = await this.utilsService.getProductsCount();
    this.ordersCount = await this.utilsService.getOrdersCount();
  }

  public async login() {
    try {
        await this.authService.login(this.credentials);
        this.router.navigateByUrl("/products");
        // todo - toaster
        console.log("logged in");
    }
    catch(err:any) {
        // todo - toaster
        console.log(err);
    }
  }
}
