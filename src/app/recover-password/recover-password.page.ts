import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {
  
  Usuario= '';

  constructor(private autenticador: AngularFireAuth,
              private router: Router,) { }

  Recover(){
    const {Usuario,} = this;
    this.autenticador.sendPasswordResetEmail( Usuario)
    .then(()=>{
      alert("reset link send to your email");
    }, (err)=>{
      alert(JSON.stringify(err))
    })
   
   }
  ngOnInit() {
  }
  Cancel(){
    this.router.navigate(['login'])
  }
  
}