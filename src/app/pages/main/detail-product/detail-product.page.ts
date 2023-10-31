import { Component, Input, OnInit, inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Product } from 'src/app/models/product.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.page.html',
  styleUrls: ['./detail-product.page.scss'],
})
export class DetailProductPage implements OnInit {
  
  @Input() product: Product;

  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);
  nav = inject(NavController);
  router = inject(Router);
  

  productSelect() {
    let productSelect = this.utilsService.getFromLocalStorage('product-select');
    this.product = productSelect;
    
  }

  ngOnInit() {
    this.productSelect();
  }
  ngOnDestroy() {
    this.utilsService.deleteFromLocalStorage('product-select');
  }


}
