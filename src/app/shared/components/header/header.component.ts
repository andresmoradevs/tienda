import { Component, Input, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() title!: string;
  @Input() backButton!: string;
  @Input() isModal!: boolean;

  utilsService = inject(UtilsService);
  firebaseService = inject(FirebaseService);

  ngOnInit() {}

  signOut() {
    this.firebaseService.signOut();
  }

  dismissModal()  {
    this.utilsService.dismissModal();
  }

}
