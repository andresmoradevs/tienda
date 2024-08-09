import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { AppointmentPage } from '../appointment/appointment.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, OnDestroy{

  modalCtrl = inject(ModalController)
  db = inject(AngularFireDatabase);
  router = inject(Router);
  utilsService = inject(UtilsService);
  id: any;

  cartCount: number = 0;

  productId: any;
  productName: any;
  productDescription: any;
  productPrice: any;
  productImages: any;

  async doItAppointment() {
    const modal = await this.modalCtrl.create({
      component: AppointmentPage
    });
    return await modal.present();
  }

  goBack() {
    this.router.navigate(['/landing']);
    this.deleteFromLStorage();
  }
  getFromLStorage() {
    this.productName = this.utilsService.getFromLocalStorage('productName');
    this.productDescription = this.utilsService.getFromLocalStorage('productDescription');
    this.productPrice = this.utilsService.getFromLocalStorage('productPrice');
    this.productImages = Object.values(this.utilsService.getFromLocalStorage('productImages')); 
    
  }
  deleteFromLStorage() {
    this.utilsService.deleteFromLocalStorage('productName');
    this.utilsService.deleteFromLocalStorage('productDescription');
    this.utilsService.deleteFromLocalStorage('productPrice');
    this.utilsService.deleteFromLocalStorage('productImages');
  }
  ngOnInit() {
    this.getFromLStorage();
    this.utilsService.cart$.subscribe(cart => {
      this.cartCount = cart.length;
    });
  }
  ngOnDestroy() {
    this.deleteFromLStorage();
  }

}
