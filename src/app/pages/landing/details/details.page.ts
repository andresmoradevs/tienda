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
export class DetailsPage implements OnInit{

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

  goBack() {
    this.router.navigate(['/landing']);
    // this.deleteFromLStorage();
  }
  
  ngOnInit() {
    
    
  }
 
}
