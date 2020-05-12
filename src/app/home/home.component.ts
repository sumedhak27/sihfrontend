import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  logReg() {
    this._router.navigateByUrl("/register/0")
  }

  login() {
    this._router.navigateByUrl("/login")
  }

}
