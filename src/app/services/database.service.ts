import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore: AngularFirestore) { }

async create(collection: string, dato: unknown){
  return await this.firestore.collection(collection).add(dato);
  }
}
