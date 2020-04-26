import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { WindowService } from '../window.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class FirebaseAuthComponent implements OnInit {

  windowRef: any;

  // country: string;
  // line: string;
  // phoneNumber = "+" +this.country + this.line
  phoneNumber = new PhoneNumber()

  verificationCode: string;

  user: any;

  constructor(public auth: AuthService, private win: WindowService, public _rouoter : Router) {
    this.windowRef = this.win.windowRef
    setTimeout(()=>{
      this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
      this.windowRef.recaptchaVerifier.render()
    }, 2000)
   }

  ngOnInit() {
  }

  sendLoginCode() {

    const appVerifier = this.windowRef.recaptchaVerifier;

    // const num = this.phoneNumber;
    const num = this.phoneNumber.e164;

    console.log(num)

    firebase.auth().signInWithPhoneNumber(num, appVerifier)
            .then(result => {

                this.windowRef.confirmationResult = result;

            })
            .catch( error => console.log(error) );

  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then( result => {

                    this.user = result.user;
                    this._rouoter.navigate(['/profile'])


    })
    .catch( error => console.log(error, "Incorrect code entered?"));
  }

}

class PhoneNumber {
  country: string;
  line: string;

  get e164() {
    const num = this.country + this.line
    return `+${num}`
  }

}

