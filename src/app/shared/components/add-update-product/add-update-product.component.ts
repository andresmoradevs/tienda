import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Camera,CameraResultType } from '@capacitor/camera';
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
      images: new FormControl([], [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      price: new FormControl(null, [Validators.required, Validators.min(0)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    })
  
  firebaseService = inject(FirebaseService);
  utilsService =  inject(UtilsService);
  productsImages: any;
  
  user = {} as User;

  ngOnInit() {
    this.user = this.utilsService.getFromLocalStorage('user');
  }

  // async takeImage() {
  //   const dataUrl = (await this.utilsService.takePicture('Imagen del Produto')).dataUrl;
  //   this.form.controls.image.setValue(dataUrl);
  // }  
  async selectFiles() {
    // const dataUrlsImages = (await this.utilsService.selectFilesImages()).photos;
    // this.form.controls.images.setValue(dataUrlsImages);
    // console.log(dataUrlsImages);
    const image = await Camera.pickImages({
      quality: 90,
      width: 100,
      height: 100,
      correctOrientation: true ,
      presentationStyle: 'popover',
      limit: 5
    });
    var imagesUrl = image.photos;
    
    this.form.controls.images.setValue(imagesUrl);
    console.log();
    
  }

  submit() {
    if(this.form.value) {
      if(this.product) this.updateProduct();
      else this.createProduct();
    } 
  }
  
  createProduct() {
  
    const productToSave: Product = {
      id: '',
      name: this.form.value.name,
      price: this.form.value.price,
      description: this.form.value.description,
      images: this.form.value.images,
    }

    console.log(productToSave);

  }

  async updateProduct() {
    
      // let path = `users/${this.user.uid}/products/${this.product.id}`;

      // const loading = await this.utilsService.loading();
      // await loading.present();

      // // if(this.form.value.image != this.product.image) {
      // //   let dataUrl = this.form.value.image;
      // //   let imagePath = await this.firebaseService.getFilePath(this.product.image);
      // //   let imageUrl = await this.firebaseService.uploadImage(imagePath, dataUrl);
      // //   this.form.controls.image.setValue(imageUrl);
        
      // // }

      

      // delete this.form.value.id

      // this.firebaseService.addDocument(path, this.form.value).then(async res => {
       
      //   this.utilsService.dismissModal({ success: true });

      //   this.utilsService.presentToast({
      //     message: `Producto actualizado!`,
      //     duration: 2500,
      //     color: 'success',
      //     position: 'middle',
      //     icon: 'checkmark-circle-outline'
      //   })
        
      // }).catch(error => {

      //   this.utilsService.presentToast({
      //     message: error.message,
      //     duration: 3500,
      //     color: 'primary',
      //     position: 'middle',
      //     icon: 'alert-circle-outline'
      //   })
        
      // }).finally(() => {
      //   loading.dismiss();
      // }) 
    
  }

}
