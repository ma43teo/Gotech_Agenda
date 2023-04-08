import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Camera, CameraOptions } from  '@awesome-cordova-plugins/camera/ngx';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
  providers: [ Camera]
})
export class CamaraPage implements OnInit {

  image!: string;

  constructor(private router: Router, 
              private camera: Camera) { }

  ngOnInit() {
  }

openCamera(){
  
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  }

  this.camera.getPicture(options).then((imageData) =>{
    this.image = 'data:image/jpeg;base64,' + imageData;
  }, err => {
    console.log(err);
  })
}

}
