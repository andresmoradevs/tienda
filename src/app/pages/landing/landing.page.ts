import { Component, inject, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import SmoothScroll from 'smooth-scroll';
import { AppointmentPage } from './appointment/appointment.page';
import { Product } from 'src/app/models/product.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  modalCtrl = inject(ModalController);
  db = inject(AngularFireDatabase);
  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);
  textSearch = '';
  router = inject(Router);

  products: Observable<any[]>;
  product: any;
  id: any;

  cartCount: number = 0;

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay: {
      delay: 200,
      disableOnInteraction: false
    }
  };

  

  ngOnInit() {
    this.getData();
    this.scroll();
    this.utilsService.cart$.subscribe(cart => {
      this.cartCount = cart.length;
    });
  }

  scroll() {
    const scroll = new SmoothScroll('a[href*="#"]', {
      speed: 800,
      speedAsDuration: true
    });
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

  async doItAppointment() {
    const modal = await this.modalCtrl.create({
      component: AppointmentPage
    });
    return await modal.present();
  }

  addToCart(product: any) {
    if (product && product.images != null) {
      this.utilsService.addToCart(product);
    } else {
      console.error("El producto no tiene una imagen válida.");
    }
  }
}
