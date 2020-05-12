import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { HttpClient} from '@angular/common/http'

// import {Component} from '@angular/core';
@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.scss']
})

export class LoginComponent {
    activitynum: number = 1;
    uidpass: object ;
    constructor( private fb : FormBuilder,
                 private _router: Router,
                 private http : HttpClient,
    ) { }
    uidpassgroup = this.fb.group ( {
        _id : ['',Validators.required],
        key : ['',Validators.required]
      } )
      profile() {
        this.uidpass = {
          _id : this.uidpassgroup.controls['_id'].value,
          key : this.uidpassgroup.controls['key'].value
        }
        this.http.post('http://localhost:3000/login', this.uidpass)
        .subscribe(result => {
          if(<number>(Object.values(result)[0]) == 1) {
            this.http.get('http://localhost:3000/admin/getActivityNum')
            .subscribe(res2 => {
              console.log(<number>(Object.values(res2)[0]))
              this.activitynum = <number>(Object.values(res2)[0]);
              if(this.activitynum == 1)
                this._router.navigateByUrl("/register/"+<string>(Object.values(this.uidpass)[0]));
              else if(this.activitynum == 2)
                this._router.navigateByUrl("/")
              else
                this._router.navigateByUrl("/");
            })
          }
          else {
            console.log(result);
            alert(<string>(Object.values(result)[1]));
          }
        }) 
      }
    
}