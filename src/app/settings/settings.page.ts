import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  darkMode: boolean = true;

  constructor(private autenticador: AngularFireAuth,
    private router: Router,
    ) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: white)');
      this.darkMode = prefersDark.matches;
     }

authentication(){
  this.autenticador.signOut()
  .then((res:any) => this.router.navigate(['login']))
  .catch((error:any) => console.dir(error));

}

cambio(){
  this.darkMode = !this.darkMode;
  document.body.classList.toggle( 'dark');
}

  ngOnInit() {
  }

  Cancel(){
    this.router.navigate(['events'])
  }
}
