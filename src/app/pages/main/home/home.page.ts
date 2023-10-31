import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service'
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);
  nav = inject(NavController);
  router = inject(Router);

  products: Product[] = [];

  // signOut() {
  //   this.firebaseService.signOut();
  // }
  user(): User  {
    return this.utilsService.getFromLocalStorage('user');
  }
  detailOfProduct(p: Product) {
    this.utilsService.saveInLocalStorage('product-select', p);
    this.router.navigateByUrl('detail-product');
    // console.log(p);
    
  }

  getProducts() {
    

    this.firebaseService.getProductsFromRealtime().subscribe({
      next: (res: any) =>  {
        // console.log(res);
        this.products = res;
        // sub.unsubscribe();
      } 
    })

  }

  addUpdateProduct(product?: Product) {
    this.utilsService.presentModal({
      component: AddUpdateProductComponent,
      cssClass: 'add-update-modal',
      componentProps: { product }
    })
  }

  getProductsFromRealtime() {

  }
  ngOnInit(): void {  
    this.getProducts();
    
  }

  
}
