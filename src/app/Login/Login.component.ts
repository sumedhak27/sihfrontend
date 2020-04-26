import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router'

// import {Component} from '@angular/core';
@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.scss']
})

export class LoginComponent {
    constructor( private fb : FormBuilder, private _router: Router
        // private http : HttpClient,
    ) { }
    password = this.fb.group ( {
        _id : ['',Validators.required],
        pass1 : ['',Validators.required]
      } )
      profile() {
        this._router.navigateByUrl("/profile")
      }
    
}