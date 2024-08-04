import { FirebaseService } from './../../../services/firebase.service';
import { Component, Input, OnInit, inject } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() title!: string;
  @Input() backButton!: string;
  @Input() isModal!: boolean;

  router = inject(Router);
  fService = inject(FirebaseService);
  utilsService = inject(UtilsService);
  
  ngOnInit() {}

  dismissModal()  {
    this.utilsService.dismissModal();
  }
  logOut() {
    this.fService.signOut();
    this.router.navigateByUrl('auth');
  }

}
