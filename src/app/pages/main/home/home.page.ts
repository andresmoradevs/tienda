import { Component, Input, OnInit, inject } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);
  products: any[];

  ngOnInit() {
    
  }

  // signOut() {
  //   this.firebaseService.signOut();
  // }
  user(): User  {
    return this.utilsService.getFromLocalStorage('user');
  }

  ionViewWillEnter() {
    this.getProducts();
  }

  async getProducts() {

    await this.firebaseService.getDB().subscribe((result) => {
      this.products = result;
      return console.log(result);
    });
  
  }

  addUpdateProduct(product?: Product) {
    this.utilsService.presentModal({
      component: AddUpdateProductComponent,
      cssClass: 'add-update-modal',
      componentProps: { product }
    })
  }
}
