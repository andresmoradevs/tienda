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

  products: Product[] = [];

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

  getProducts() {
    let path = `users/${this.user().uid}/products`;

    let sub = this.firebaseService.getCollectionData(path).subscribe({
      next: (res: any) =>  {
        console.log(res);
        this.products = res;
        sub.unsubscribe();
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
}
