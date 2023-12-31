import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AngularFireDatabase, PathReference, AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  db = inject(AngularFireDatabase);
  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);
  textSearch = '';
  router = inject(Router);

  products: Observable<any[]>;
  product: any;
  id: any;

  ngOnInit() {
    this.getData();

  }
  
  getData() {
    
    return this.products = this.db.list('products').valueChanges();
    
  }

  sendDetailsProduct(product: Product) {
    this.utilsService.saveInLocalStorage('productId', product.id);
    this.utilsService.saveInLocalStorage('productName', product.name);
    this.utilsService.saveInLocalStorage('productDescription', product.description);
    this.utilsService.saveInLocalStorage('productPrice', product.price);
    this.utilsService.saveInLocalStorage('productImages', product.images);
    
  }
 

  search(event) {
      this.textSearch = event.detail.value;
  }

}
