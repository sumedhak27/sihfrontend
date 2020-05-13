import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { LoginService } from './login.service';

// import {Component} from '@angular/core';
@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.scss']
})

export class LoginComponent implements OnInit{
    constructor( private _router: Router, 
      private service: LoginService,
        // private http : HttpClient,
    ) { }
    
    password = '';
    _id = '';
    //message: string;

      profile() {
        //this.message = this._id
        this.service.newId(this._id)
        this._router.navigateByUrl("/admitCard")
        // this.service.login();
      }

      ngOnInit() {
        //this.service.id.subscribe(result => this._id = result)
      }
    

}

