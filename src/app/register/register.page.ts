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
}
