import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  })
  
  firebaseService = inject(FirebaseService);
  utilsService =  inject(UtilsService);

  ngOnInit() {

  }

  async submit() {
    if(this.form.valid) {

      const loading = await this.utilsService.loading();
      await loading.present();

      this.firebaseService.signUp(this.form.value as User).then(async res => {
        // console.log(res);
        await this.firebaseService.updateUser(this.form.value.name)

        let uid = res.user.uid;
        this.form.controls.uid.setValue(uid);

        this.setUserInfo(uid);
        
      }).catch(error => {
        
        // console.log(error);

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

  async setUserInfo(uid: string) {
    if(this.form.valid) {

      const loading = await this.utilsService.loading();
      await loading.present();

      let path = `users/${uid}`;
      delete this.form.value.password;

      this.firebaseService.setDocument(path, this.form.value).then(res => {
        // console.log(res);

        this.utilsService.saveInLocalStorage('user', this.form.value);
        this.utilsService.routerLink('/main/home');
        this.form.reset();
        
      }).catch(error => {
        
        console.log(error);

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

}
