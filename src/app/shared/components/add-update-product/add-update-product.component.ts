import { Component, Input, OnInit, inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Camera,CameraResultType } from '@capacitor/camera';
import { FilePicker } from '@capawesome/capacitor-file-picker';

import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

// import { FilePicker } from '@capawesome/capacitor-file-picker';
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
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      techs: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    })
  
  firebaseService = inject(FirebaseService);
  database = inject(AngularFireDatabase);
  utilsService =  inject(UtilsService);
  productsImages: any;
  
  filePath: any;
  user = {} as User;

  onFileSelected(event) {
    const filesImages = event.target.files;

    this.productsImages = filesImages;

    this.form.controls.images.setValue(this.productsImages);
  }


  ngOnInit() {
    this.user = this.utilsService.getFromLocalStorage('user');

  }

  submit() {
    this.createProduct();
  }
  
  createProduct() {

    const product_id = this.firebaseService.database.createPushId();
    
    const productToSave: any = {
      id: product_id,
      name: this.form.value.name,
      price: this.form.value.price,
      description: this.form.value.description,
      images: this.form.value.images,
      techs: this.form.value.techs
    }
    
    this.firebaseService.addProduct(productToSave.id, productToSave);

  }


}