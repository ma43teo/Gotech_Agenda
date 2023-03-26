import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { CalendarMode} from 'ionic2-calendar';
import { CalendarComponent } from 'ionic2-calendar';
import { EventDetailsPage } from '../pages/school/event-details/event-details.page';
import { Router } from '@angular/router';




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
    {
     title: 'Relleno',
     description: 'What is Lorem Ipsum?',
     startTime: new Date(2023,4,22,12,11,11),
     endTime: new Date(2023,4,22,14,11,11),
     img: 'https://picsum.photos/200',
     allDay: false

     
    },
    {
     title: 'Viaje de Mateo',
     description: 'el Señor mateo viajara a roma el dia 22',
     startTime: new Date(2023,4,22,12,11,11),
     endTime: new Date(2023,4,22,14,11,11),
     img: 'https://picsum.photos/200',
     allDay: false

   },
    {
     title: 'Viaje de pedro',
     description: 'pedro viaja a roma',
     startTime: new Date(2023,4,2,12,11,11),
     endTime: new Date(2023,4,2,14,11,11),
     img: 'https://picsum.photos/200',
     allDay: false

   },
   {
     title: 'What is Lorem Ipsum?',
     description: 'What is Lorem Ipsum?',
     startTime: new Date(2021,10,21,2,11,11),
     endTime: new Date(2021,10,21,4,11,11),
     img: 'https://picsum.photos/200',
     allDay: false

   },
   {
     title: 'What is Lorem Ipsum?',
     description: 'What is Lorem Ipsum?',
     startTime: new Date(2021,10,20,12,11,11),
     endTime: new Date(2021,10,20,14,11,11),
     img: 'https://picsum.photos/200',
     allDay: false

     
   } 
   ];

  constructor(public modalController: ModalController, private router: Router, private alertController: AlertController) { 
    this.showAddEvent = false;
    this.allEvents = [];
    this.minDate = '2023-03-20'; 

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

  ngOnInit() {
    this.allEvents = this.myData;

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
        message: 'El evento no puede ser guardado en una fecha anterior a la actual. ¿Desea continuar?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Continuar',
            handler: () => {
              this.allEvents.push({
                title: this.newEvent.title,
                startTime: new Date(this.newEvent.startTime),
                endTime: new Date(this.newEvent.endTime),
                description: this.newEvent.description,
                img: this.newEvent.img,
                allDay: false
              } as IEvent);
              console.log(this.newEvent);
            }
          }
        ]
      });
      await alert.present();
    } else {
      this.allEvents.push({
        title: this.newEvent.title,
        startTime: new Date(this.newEvent.startTime),
        endTime: new Date(this.newEvent.endTime),
        description: this.newEvent.description,
        img: this.newEvent.img,
        allDay: false
      } as IEvent);
      console.log(this.newEvent);
    }
  }
  
  
  presentAlertPrompt(){
    this.router.navigate(['settings'])
  }
}