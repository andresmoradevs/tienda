import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AngularFireDatabase, PathReference, AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  db = inject(AngularFireDatabase);
  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);

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

  sendDetailsProduct(p: any) {
    
    this.utilsService.saveInLocalStorage('images', p.images);

    // this.router.navigate("", p.id);
    
  }

}
