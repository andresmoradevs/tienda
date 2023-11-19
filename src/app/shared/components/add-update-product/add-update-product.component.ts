import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Camera,CameraResultType } from '@capacitor/camera';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { FilePicker } from '@capawesome/capacitor-file-picker';
// import { FileOpener } from '@capawesome-team/capacitor-file-opener';

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

  imageSrc1?: any;
  imageSrc2?: any;
  imageSrc3?: any;
  
  filePath: any;
  user = {} as User;

  pickFiles = async () => {
    const result = await FilePicker.pickFiles({
      types: ['images/png'],
      multiple: false,
      readData: true
    });
    // this.filePath = result.files[0].path;
    // this.imageSrc1 = 'data:image/jpeg;base64,' + result.files[0].data;
  };
  pickImages = async () => {
    const result = await FilePicker.pickImages({
      multiple: true,
      readData: true
    });
    // this.imageSrc1 = 'data:image/jpeg;base64,' + result.files[0];
    for (let index = 0; index < result.files.length; index++) {
      var elements = result.files[index].data;
      
      
    }
    
    
    // this.imageSrc2 = 'data:image/jpeg;base64,' + result.files[1].data;
    // this.imageSrc2 = 'data:image/jpeg;base64,' + result.files[2].data;
    // for (let i = 0; i < result.files.length; i++) {
    //   // const e = result.files[i];
    //   this.productsImages = 'data:image/jpeg;base64,' + result.files[i].data;
    //   // this.productsImages === e.data;
    //   // console.log(e); 
    //   // this.productsImages = 'data:image/jpeg;base64,' + result.files[i].data;
    // }
    
  }

  ngOnInit() {
    this.user = this.utilsService.getFromLocalStorage('user');
  }

  // async takeImage() {
  //   const dataUrl = (await this.utilsService.takePicture('Imagen del Produto')).dataUrl;
  //   this.form.controls.image.setValue(dataUrl);
  // }  
  async selectFiles() {
    var dataUrlsImages = ((await this.utilsService.selectFilesImages()).photos);

  }

  submit() {
    if(this.form.value) {
      if(this.product) this.updateProduct();
      else this.createProduct();
    } 
  }
  
  createProduct() {
    const product_id = this.firebaseService.database.createPushId();
  
    const productToSave: Product = {
      id: product_id,
      name: this.form.value.name,
      price: this.form.value.price,
      description: this.form.value.description,
      images: this.form.value.images,
    }
    
    // var uid = this.firebaseService.addProduct(productToSave).key;
    // this.form.controls.id.setValue(uid);
    // this.firebaseService.updateProduct(productToSave, uid);
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
