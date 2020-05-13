import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { LoginService } from '../Login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class resultComponent implements OnInit {

  constructor(
    private _router: Router,
    private http : HttpClient,
    private service: LoginService,
    ) { }

  formData: object;
  result: object;
  loginid:string;

  ngOnInit() {
    this.service.id.subscribe(result => this.loginid = result)

    let body = {
      _id : this.loginid
    }
    console.log("Helloo")
    let promise = this.http.post("http://localhost:3000/form/fetchForm", body)
    promise.subscribe((res) => {
      this.formData = res;
      // console.log(this.formData)
      console.log(typeof(res))
      // console.log(typeof(Object.values(res)[0]), "  " , Object.values(res)[0])
    })

    //Result API
    console.log("hii")
    let promise1 = this.http.get("http://localhost:3000/document/getResult", {params: body})
    promise1.subscribe((res) => {
      this.result = res;
      console.log(this.result)
      console.log(typeof(res))
      // console.log(typeof(Object.values(res)[0]), "  " , Object.values(res)[0])
    })
  }

}
