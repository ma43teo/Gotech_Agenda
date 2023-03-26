import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  darkMode: boolean = true;

  constructor() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      this.darkMode = prefersDark.matches;
  }
  cambio(){
    this.darkMode = !this.darkMode;
    document.body.classList.toggle( 'dark');
  }

}
