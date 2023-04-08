import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  Usuario ='';
  Clave='';
  cclave='';
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private autenticador: AngularFireAuth,
              private router: Router,
              public alertController: AlertController){ }

  async Register() {
    const { Usuario, Clave, cclave } = this;

    if (this.checkFields()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos',
        buttons: ['OK']
      });
      await alert.present(); 
    }
    else if (Clave !== cclave) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Contraseñas no coinciden',
        buttons: ['OK']
      });
      await alert.present(); 
    }else{
      try{
        const result = this.autenticador.createUserWithEmailAndPassword( Usuario, Clave)
        .then(() => this.router.navigate(['events'])) ;
      }catch(err){
       console.dir(err);
      }
    }
  }

  ngOnInit() {
  }
  
  Cancel(){
    this.router.navigate(['login'])
  }
  
  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }
  
  toggleConfirmPassword() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
  
  checkFields() {
    return this.Usuario.trim() === '' || this.Clave.trim() === '' || this.cclave.trim() === '';
  }
}