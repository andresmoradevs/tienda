import { Component, inject, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { UtilsService } from 'src/app/services/utils.service';
import { AppointmentPage } from '../appointment/appointment.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cart: Product[] = [];
  textSearch = '';
  cartCount: number = 0;
  modalCtrl = inject(ModalController);

  constructor(private utilService: UtilsService) {}

  ngOnInit() {
    this.utilService.cart$.subscribe(cart => {
      this.cart = cart;
    });
    
  }

  removeFromCart(product: Product) {
    this.utilService.removeFromCart(product);
  }

  clearCart() {
    this.utilService.clearCart();
  }
  /* search(event) {
    this.textSearch = event.detail.value;
  } */
  async doItAppointment() {
    const modal = await this.modalCtrl.create({
      component: AppointmentPage
    });
    return await modal.present();
  }
}
