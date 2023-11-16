import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';

export interface Product {
  id: string,
    name: string,
    description: string,
    price: number,
    images: any[]
}

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, OnDestroy{

  db = inject(AngularFireDatabase);
  utilsService = inject(UtilsService);
  id: any;

  productId: any;
  productName: any;
  productDescription: any;
  productPrice: any;
  productImages: any;
  
 
  constructor(private router: Router) {
    
  }
  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };

  getProducts
  goBack() {
    this.router.navigate(['/landing']);
    this.deleteFromLStorage();
  }
  getFromLStorage() {
    this.productId = this.utilsService.getFromLocalStorage('productId');
    this.productName = this.utilsService.getFromLocalStorage('productName');
    this.productDescription = this.utilsService.getFromLocalStorage('productDescription');
    this.productPrice = this.utilsService.getFromLocalStorage('productPrice');
    this.productImages = Object.values(this.utilsService.getFromLocalStorage('productImages')); 
    console.log(this.productImages);
    
  }
  deleteFromLStorage() {
    this.utilsService.deleteFromLocalStorage('productId');
    this.utilsService.deleteFromLocalStorage('productName');
    this.utilsService.deleteFromLocalStorage('productDescription');
    this.utilsService.deleteFromLocalStorage('productPrice');
    this.utilsService.deleteFromLocalStorage('productImages');
    // this.utilsService.deleteFromLocalStorage('productImage2');
    // this.utilsService.deleteFromLocalStorage('productImage3');
    // this.utilsService.deleteFromLocalStorage('productImage4');
    // this.utilsService.deleteFromLocalStorage('productImage5');
  }
  ngOnInit() {
    this.getFromLStorage();
  }
  ngOnDestroy() {
    this.deleteFromLStorage();
  }

}
