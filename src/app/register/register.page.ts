import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  Usuario ='';
  Clave='';
  cclave='';


  constructor(private autenticador: AngularFireAuth,
              private router: Router ) { }

  Register() {
   const { Usuario, Clave, cclave } = this;
    if (Clave !== cclave) {
      console.log('Contraseñas no coinciden.');  
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
    const passwordField: any = document.getElementById('password-field');
    const icon: any = document.getElementById('password-icon');
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      icon.name = 'eye-off';
    } else {
      passwordField.type = 'password';
      icon.name = 'eye';
    }
  }
}
