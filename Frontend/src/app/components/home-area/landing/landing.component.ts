import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialModel } from 'src/app/models/credentials.model';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

    public productsCount: number;
    public ordersCount: number;
    public showRegister: boolean = false;

  constructor(private utilsService: UtilsService) { }

  async ngOnInit(): Promise<void> {
    this.productsCount = await this.utilsService.getProductsCount();
    this.ordersCount = await this.utilsService.getOrdersCount();
  }
}
