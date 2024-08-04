import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { AddUpdateProductComponent } from '../shared/components/add-update-product/add-update-product.component';
import { Camera, CameraResultType,CameraSource } from '@capacitor/camera';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private cart = new BehaviorSubject<Product[]>([]);
  cart$ = this.cart.asObservable();

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  modalController = inject(ModalController);
  router = inject(Router);

  async takePicture(promptLabelHeader: string) {
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      promptLabelHeader,
      promptLabelPhoto: 'Selecciona una imagen',
      promptLabelPicture: 'Toma una foto'
    });

  };

  async selectFilesImages() {
    return await Camera.pickImages({
      quality: 90,
      width: 100,
      height: 100,
      correctOrientation: true ,
      presentationStyle: 'popover',
      limit: 5
    });
  }

  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' })
  }

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }
  deleteFromLocalStorage(key: string) {
    return localStorage.removeItem(key);
  }

  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  async presentModal(opts: ModalOptions) {
    const modal = await this.modalController.create(opts);
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) return data;
  }
  
  dismissModal(data?: any) {
    return this.modalController.dismiss(data);
  }

  addToCart(product: Product) {
    const currentCart = this.cart.value;
    currentCart.push(product);
    this.cart.next(currentCart);
    localStorage.setItem('cart', JSON.stringify(currentCart));
  }
  getCartItems() {
    return this.cart.value;
  }

  removeFromCart(product: Product) {
    const currentCart = this.cart.value;
    const index = currentCart.findIndex(p => p.id === product.id);
    if (index > -1) {
      currentCart.splice(index, 1);
      this.cart.next(currentCart);
      localStorage.setItem('cart', JSON.stringify(currentCart));
    }
  }

  clearCart() {
    this.cart.next([]);
    localStorage.removeItem('cart');
  }
}
