import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { CalendarMode} from 'ionic2-calendar';
import { CalendarComponent } from 'ionic2-calendar';
import { EventDetailsPage } from '../pages/school/event-details/event-details.page';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';




export interface Calendar {
  currentDate: Date;
  

}
export interface IEvent {
  
  allDay: boolean;
  endTime: Date;
  startTime: Date;
  title: string;
  description: string;
  img: string;
}

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})

export class EventsPage implements OnInit {
  event: any = {};
  minDate: string;

  allEvents: IEvent[];

  currentMonth:string="ss"; 

  calendar= {
    mode:'month' as CalendarMode,
    currentDate: new Date(Date.now())
  };
  

  newEvent: any = {
    title:'',
    description:'',
    startTime:'',
    endTime:'',
    img:'',
    

  };
  showAddEvent:boolean;

  @ViewChild(CalendarComponent, { static: false }) myCal!: CalendarComponent;


  myData = [
   ];
  eventCollection: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;

  constructor(public modalController: ModalController, private router: Router, private alertController: AlertController) { 
    this.showAddEvent = false;
    this.allEvents = [];
    this.minDate = '2023-03-20'; 

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
  
    // Crea una referencia a la colección de eventos en Firebase
    this.eventCollection = firebase.firestore().collection('Eventos');
  
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async ngOnInit() {
    const querySnapshot = await this.eventCollection.get();
    querySnapshot.forEach((doc) => {
      const eventData = doc.data();
      const event: IEvent = {
        title: eventData['title'],
        description: eventData['description'],
        startTime: eventData['startTime'].toDate(),
        endTime: eventData['endTime'].toDate(),
        img: eventData['img'],
        allDay: eventData['allDay']
      };
      this.allEvents.push(event);
    });
  
    this.today();
  }
  
  


  onViewTitleChanged(title:string){
    this.currentMonth = title;
  }

  async onEventSelected(ev: any) {
    this.newEvent = ev;
    const modal = await this.modalController.create({
      component: EventDetailsPage,
      componentProps: ev
    });
    return await modal.present();
  }
  back(){
    this.myCal.slidePrev();
  }

  next(){
    this.myCal.slideNext();
  }

  showHideForm(){
    this.showAddEvent = !this.showAddEvent;
    this.newEvent = {
      title:'',
      description:'',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      img:'',
    }
  }

  today(){
    this.calendar.currentDate = new Date( Date.now());

  }


  changeMode(mode: any) {
    this.calendar.mode = mode;
  }

  async addEvent() {
    const now = new Date();
    const eventDate = new Date(this.newEvent.startTime);
    if (eventDate < now) {
      const alert = await this.alertController.create({
        header: 'Fecha inválida',
        message: 'El evento no puede ser guardado en una fecha anterior a la actual.',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Continuar',
            handler: async () => {
              // Guarda el evento en Firebase
              await this.eventCollection.add({
                title: this.newEvent.title,
                startTime: new Date(this.newEvent.startTime),
                endTime: new Date(this.newEvent.endTime),
                description: this.newEvent.description,
                img: this.newEvent.img,
                allDay: false
              });
  
              // Agrega el evento a la lista de eventos
              this.allEvents.push({
                title: this.newEvent.title,
                startTime: new Date(this.newEvent.startTime),
                endTime: new Date(this.newEvent.endTime),
                description: this.newEvent.description,
                img: this.newEvent.img,
                allDay: false
              } as IEvent);
            }
          }
        ]
      });
      await alert.present();
    } else {
      // Guarda el evento en Firebase
      await this.eventCollection.add({
        title: this.newEvent.title,
        startTime: new Date(this.newEvent.startTime),
        endTime: new Date(this.newEvent.endTime),
        description: this.newEvent.description,
        img: this.newEvent.img,
        allDay: false
      });
  
      // Agrega el evento a la lista de eventos
      this.allEvents.push({
        title: this.newEvent.title,
        startTime: new Date(this.newEvent.startTime),
        endTime: new Date(this.newEvent.endTime),
        description: this.newEvent.description,
        img: this.newEvent.img,
        allDay: false
      } as IEvent);
    }
  
    // Cierra el formulario
    this.showAddEvent = false;
    this.newEvent = {
      title:'',
      description:'',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      img:'',
}

  }


  Configuraciones(){
    this.router.navigate(['settings'])

}
}

