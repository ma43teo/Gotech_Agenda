import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {
  
  Usuario= '';

  constructor(private autenticador: AngularFireAuth,
              private router: Router,
              private alertController: AlertController) { }

              async Recover(){
                const {Usuario,} = this;
                      
                // Validación de correo electrónico
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(Usuario)) {
                  const alert = await this.alertController.create({
                    header: 'Error',
                    message: 'El correo electrónico ingresado no es válido',
                    buttons: ['OK']
                  });
                  await alert.present();
                  return;
                }
                
                // Envío de correo electrónico
                try {
                  await this.autenticador.sendPasswordResetEmail(Usuario);
                  const alert = await this.alertController.create({
                    header: 'Exito',
                    message: 'Se ha enviado un enlace de restablecimiento de contraseña a su correo electrónico',
                    buttons: ['OK']
                  });
                  await alert.present();
                } catch (err) {
                  const alert = await this.alertController.create({
                    header: 'Error',
                    message: JSON.stringify(err),
                    buttons: ['OK']
                  });
                  await alert.present();
                }
              }
              
  ngOnInit() {
  }
  
  Cancel() {
    this.router.navigate(['login'])
}
}
