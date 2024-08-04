import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage {

  appointmentData = {
    brand: '',
    model: '',
    size: '',
    technology: '',
    issue: ''
  };

  constructor(private modalCtrl: ModalController, private db: AngularFireDatabase) {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  submitForm() {
    this.db.list('appointments').push(this.appointmentData).then(() => {
      this.dismiss();
    });
  }
}
