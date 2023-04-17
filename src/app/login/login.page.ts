import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  Usuario = '';
  Clave = '';

  constructor(private autenticador: AngularFireAuth,
              private roter: Router,
              public alertController: AlertController) { }

  correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  async Login() {
    const {Usuario, Clave} = this;
    try {
      await this.autenticador.signInWithEmailAndPassword( Usuario, Clave);
      this.roter.navigate(['events']);
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Correo o contraseña incorrecta. Por favor intente nuevamente',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  ngOnInit() {}

  Register() {
    this.roter.navigate(['register']);
  }

  Password() {
    this.roter.navigate(['recover-password']);
  }

  async validarCampos() {
    if (!this.Usuario || !this.Clave) {
      // Muestra una alerta si los campos están vacíos
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor ingrese su correo electrónico y contraseña',
        buttons: ['OK']
      });
      await alert.present();
    } else if (!this.correoRegex.test(this.Usuario)) {
      // Muestra una alerta si el correo electrónico no es válido
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor ingrese un correo electrónico válido',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      this.Login();
    }
  }

  togglePassword() {
    const passwordField: any = document.getElementById('password-field');
    const icon: any = document.getElementById('password-icon');
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      icon.name = 'eye';
    } else {
      passwordField.type = 'password';
      icon.name = 'eye-off';
    }
  }
}
