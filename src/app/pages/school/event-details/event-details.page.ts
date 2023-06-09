import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import '@firebase/firestore';



export interface IEvent {
  
  allDay: boolean;
  endTime: Date;
  startTime: Date;
  title: string;
  description: string;
  img: string;
}

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {
  title: string;
  description: string;
  img: string;
  startTime: string;
  endTime: string;
  event: any = {};


  allEvents: any;
  doc:any;
  eventCollection: AngularFirestoreCollection<IEvent>;
  allDay: any;

  constructor(public modalController: ModalController,private router: Router,private alertController: AlertController,
              public navParams: NavParams,
              private firestore: AngularFirestore) {
                this.eventCollection = this.firestore.collection<IEvent>('Eventos');
              
    this.title = navParams.get('title');
    this.img = navParams.get('img');
    this.description = navParams.get('description');
    this.startTime = navParams.get('startTime');
    this.endTime = navParams.get('endTime');

    const firebaseConfig = {
      apiKey: "AIzaSyDQfZZhqWuq8JtDKC3HIZz9UOaeQF3ga6Q",
authDomain: "agendaautenticacionionic.firebaseapp.com",
projectId: "agendaautenticacionionic",
storageBucket: "agendaautenticacionionic.appspot.com",
messagingSenderId: "179527070115",
appId: "1:179527070115:web:debc379e0b5efcbb126a16"

      // Aquí debes colocar los datos de tu proyecto de Firebase
    };
    firebase.initializeApp(firebaseConfig);

  
  }
  

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss();
  }
  async deleteDocumentByTitle(title: string) {
    const querySnapshot = await this.eventCollection.ref.where('title', '==', title).get();
    if (querySnapshot.empty) {
      console.log('No se encontró el documento');
      return;
    }
  
    const docRef = querySnapshot.docs[0].ref;
    this.presentDeleteConfirmationAlert(title);
  }
  
  async presentDeleteConfirmationAlert(title: string) {
    const alert = await this.alertController.create({
      header: 'Eliminar Evento',
      message: `¿Estás seguro de que quieres eliminar el evento "${title}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        { 
          text: 'Eliminar',
          handler: () => {
            const docRef = this.eventCollection.ref.where('title', '==', title).get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                doc.ref.delete().then(() => {
                  console.log('Documento eliminado');
                  this.modalController.dismiss();
                  location.reload();
                  
                }).catch((error) => {
                  console.error('Error eliminando documento: ', error);
                });
              });
            });
            
          
        }}
      ]
    });

    await alert.present();
}

}









