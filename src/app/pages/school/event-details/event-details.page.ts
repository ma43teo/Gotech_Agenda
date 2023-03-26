import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {
title:string;
decsription:string;
img:string;
startTime: string;
endTime: string;
constructor(public modalController: ModalController,
  public navParams: NavParams) {
  this.title = navParams.get('title');
  this.img = navParams.get('img');
  this.decsription = navParams.get('description');
  this.startTime = navParams.get('startTime');
  this.endTime = navParams.get('endTime');
}
  
  ngOnInit() {
  }

  close(){
    this.modalController.dismiss();
  }

}