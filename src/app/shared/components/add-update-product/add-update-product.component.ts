import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
})
export class AddUpdateProductComponent  implements OnInit {

  @Input() product: Product;

  form = new FormGroup({
    id: new FormControl(''),
    image: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl(null, [Validators.required, Validators.min(0)]),
    soldUnits: new FormControl(null, [Validators.required, Validators.min(0)]),
  })
  
  firebaseService = inject(FirebaseService);
  utilsService =  inject(UtilsService);

  user = {} as User;

  ngOnInit() {
    this.user = this.utilsService.getFromLocalStorage('user');
    if(this.product) this.form.setValue(this.product);
  }

  async takeImage() {
    const dataUrl = (await this.utilsService.takePicture('Imagen del Produto')).dataUrl;
    this.form.controls.image.setValue(dataUrl);
  }  

  submit() {
    if(this.form.value) {
      if(this.product) this.updateProduct();
      else this.createProduct();
    } 
  }
  
  async createProduct() {
    
      let path = `users/${this.user.uid}/products`;

      const loading = await this.utilsService.loading();
      await loading.present();

      let dataUrl = this.form.value.image;
      let imagePath = `${this.user.uid}/${Date.now()}`;
      let imageUrl = await this.firebaseService.uploadImage(imagePath, dataUrl);
      this.form.controls.image.setValue(imageUrl);

      delete this.form.value.id

      this.firebaseService.addDocument(path, this.form.value).then(async res => {
       
        this.utilsService.dismissModal({ success: true });

        this.utilsService.presentToast({
          message: `Producto creado!`,
          duration: 2500,
          color: 'success',
          position: 'middle',
          icon: 'checkmark-circle-outline'
        })
        
      }).catch(error => {

        this.utilsService.presentToast({
          message: error.message,
          duration: 3500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
        
      }).finally(() => {
        loading.dismiss();
      }) 
    
    
  }

  async updateProduct() {
    
      let path = `users/${this.user.uid}/products/${this.product.id}`;

      const loading = await this.utilsService.loading();
      await loading.present();

      if(this.form.value.image != this.product.image) {
        let dataUrl = this.form.value.image;
        let imagePath = await this.firebaseService.getFilePath(this.product.image);
        let imageUrl = await this.firebaseService.uploadImage(imagePath, dataUrl);
        this.form.controls.image.setValue(imageUrl);
        
      }

      

      delete this.form.value.id

      this.firebaseService.addDocument(path, this.form.value).then(async res => {
       
        this.utilsService.dismissModal({ success: true });

        this.utilsService.presentToast({
          message: `Producto actualizado!`,
          duration: 2500,
          color: 'success',
          position: 'middle',
          icon: 'checkmark-circle-outline'
        })
        
      }).catch(error => {

        this.utilsService.presentToast({
          message: error.message,
          duration: 3500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
        
      }).finally(() => {
        loading.dismiss();
      }) 
    
  }

}
