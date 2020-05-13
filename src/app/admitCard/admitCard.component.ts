import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { LoginService } from '../Login/login.service';

@Component({
  selector: 'app-admitCard',
  templateUrl: './admitCard.component.html',
  styleUrls: ['./admitCard.component.scss']
})
export class AdmitCardComponent implements OnInit {
 
  formData: object;
  loginid:string;

  constructor(
    private _router: Router,
    private http : HttpClient,
    private service: LoginService,
    ) { }

  ngOnInit() {
    this.service.id.subscribe(result => this.loginid = result)

    let body = {
      _id : this.loginid
    }
    console.log("Helloo")
    let promise = this.http.post("https://cryptic-dusk-69277.herokuapp.com/form/fetchForm", body)
    promise.subscribe((res) => {
      this.formData = res;
      // console.log(this.formData)
      console.log(typeof(res))
      // console.log(typeof(Object.values(res)[0]), "  " , Object.values(res)[0])
    })
  }

  

}
