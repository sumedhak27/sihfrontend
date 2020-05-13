import { Injectable } from '@angular/core';
import { EventEmitter } from 'protractor';
// import { Pass } from './Login.component';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // $isLoggedIn = new EventEmitter();
  // pass : Pass;
  // constructor() { }

  login () {
    console.log("Login Service")
  }
  
  private idSource = new BehaviorSubject('temp value');
  id = this.idSource.asObservable();

  constructor() { }

  newId(id: string) {
    this.idSource.next(id)
    
  }
}
