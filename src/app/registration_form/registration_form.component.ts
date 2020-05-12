import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage'; 
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

// import {Component} from '@angular/core';
@Component({
  selector: 'app-registration_form',
  templateUrl: './registration_form.component.html',
  styleUrls: ['./registration_form.component.scss']
})



export class registrationFormComponent implements OnInit {
  constructor( private fb : FormBuilder, 
              private http : HttpClient, 
              private _router : Router,
              private activatedRoute : ActivatedRoute,
              private storage: AngularFireStorage
  ) { }
              
  formData:object;
  userId: string;
  status = {};
  userIdRecieved = false;
  // password = null;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  aadhardownloadURL: string;
              
  // Photo Upload
  public imagePath;
  imgURL: any;
  aadhar_card;
  public message: string;
 
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
  //Image Upload end

  password = this.fb.group ( {
    pass1 : ['',Validators.required],
    pass2 : ['',Validators.required]
  } )

  registrationForm = this.fb.group({
    selfFirstName: ['', Validators.required],
    selfLastName: ['', Validators.required],
    fatherFirstName: ['', Validators.required],
    fatherLastName: ['', Validators.required],
    motherFirstName: ['', Validators.required],
    motherLastName: ['', Validators.required],
    DOB: ['', Validators.required],
    streetAddress: ['', Validators.required],
    city: ['', Validators.required],
    district: ['', Validators.required],
    state: ['', Validators.required],
    postalCode: ['', Validators.required],
    Email: ['', Validators.required],
    mobNo: ['', Validators.required],
    paperLanguage: ['', Validators.required],
  });

  createApplicantObject() {
    this.formData = { 
      _id: this.userId,
      name : { 
        firstName: this.registrationForm.controls['selfFirstName'].value,
        lastName: this.registrationForm.controls['selfLastName'].value
      },
      fatherName : {
        firstName: this.registrationForm.controls['fatherFirstName'].value,
        lastName: this.registrationForm.controls['fatherLastName'].value
      },
      motherName : {
        firstName: this.registrationForm.controls['motherFirstName'].value,
        lastName: this.registrationForm.controls['motherLastName'].value
      },
      DOB : this.registrationForm.controls['DOB'].value,
      address: {
        street: this.registrationForm.controls['streetAddress'].value,
        city: this.registrationForm.controls['city'].value,
        district: this.registrationForm.controls['district'].value,
        state: this.registrationForm.controls['state'].value,
        postalCode: this.registrationForm.controls['postalCode'].value,
      },
      Email: this.registrationForm.controls['Email'].value,
      mobNo: this.registrationForm.controls['mobNo'].value, 
      paperLanguage : this.registrationForm.controls['paperLanguage'].value,
      aadhar_url : this.aadhardownloadURL
    };
  }

  

  upload() {
    this.aadhar_card = <File>((<HTMLInputElement>document.getElementById('aadhar_card')).files[0]);
    console.log(this.aadhar_card);
    const path = `aadhar/${Date.now()}_${this.aadhar_card.name}`;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, this.aadhar_card);
    this.percentage = this.task.percentageChanges();
    console.log(this.task)
    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize( async() =>  {
        this.aadhardownloadURL = await ref.getDownloadURL().toPromise();
      }),
    );
  }

  onSubmit () {
    
    this.userId = this.registrationForm.controls['selfFirstName'].value.toUpperCase()+
                  this.registrationForm.controls['fatherFirstName'].value[0].toUpperCase()+
                  this.registrationForm.controls['motherFirstName'].value[0].toUpperCase()+ 
                  this.registrationForm.controls['DOB'].value.toString();
    this.createApplicantObject();
    console.warn(this.formData)
    
    let promise1 = this.http.post("http://localhost:3000/form/storeForm", this.formData )
    promise1.subscribe((res) => {
      console.log(res)
      this.userIdRecieved = true;
      alert("Form Submitted Successfully!!✔")
    },
    (err) => {
      console.warn(err)
    })
    console.log(Object.keys(this.formData));
  }

  onUpdate() {
    this.createApplicantObject();
    this.http.post("http://localhost:3000/form/updateForm", this.formData)
    .subscribe(result => {
      console.log(result);
      if(<number>(Object.values(result)[0]) == 1) {
        alert(<string>(Object.values(result)[1]));
        this._router.navigateByUrl('/');
      }
      else
        alert(<string>(Object.values(result)[1]));
    },
    err => {
        alert("Error in updating Form. Try after some time. 😥");
    })
  }



  setUserIdPass() {
    if((this.password.controls['pass1'].value!='' && this.password.controls['pass2'].value!='') && (this.password.controls['pass1'].value===this.password.controls['pass2'].value)){
      let body = {
        _id : this.userId,
        key : this.password.controls['pass1'].value
      }
      // let p = this.http.post("https://glacial-sands-20481.herokuapp.com/form/newUser", body)
      this.http.post("http://localhost:3000/form/setPassword", body)
      .subscribe(res => {
        console.log(res)
        alert(<string>(Object.values(res)[1]));
        this._router.navigateByUrl("/");
      }, 
      err => {
        console.log(err);
      })
    }
    else {
      alert("Wrong Input in password Or password does not match.")
    }
    
  }

  sub ;
  currentformdata;
  loggedin:boolean = false;

  ngOnInit() {
    this.http.get('http://localhost:3000/admin/getActivityNum')
    .subscribe(result => {
      if(<number>(Object.values(result)[0]) == 1) {
        this.sub = this.activatedRoute.paramMap.subscribe(params => {
          console.log(typeof(params.get('userid'))+" : ", params.get('userid'));
          if(params.get('userid') != "0") {
              this.loggedin = true;
              console.log("I am here.")
              this.userId = params.get('userid');
              this.http.post('http://localhost:3000/form/fetchForm', { _id : this.userId} )
              .subscribe(result => {
                console.log(result);
                this.currentformdata = {
                  selfFirstName: <string>(Object.values(<string>(Object.values(result)[1]))[0]),
                  selfLastName: <string>(Object.values(<string>(Object.values(result)[1]))[1]),
                  fatherFirstName: <string>(Object.values(<string>(Object.values(result)[2]))[0]),
                  fatherLastName: <string>(Object.values(<string>(Object.values(result)[2]))[1]),
                  motherFirstName: <string>(Object.values(<string>(Object.values(result)[3]))[0]),
                  motherLastName: <string>(Object.values(<string>(Object.values(result)[1]))[1]),
                  DOB: <string>(Object.values(result)[4]),
                  streetAddress: <string>(Object.values(<string>(Object.values(result)[5]))[0]),
                  city: <string>(Object.values(<string>(Object.values(result)[5]))[1]),
                  district: <string>(Object.values(<string>(Object.values(result)[5]))[2]),
                  state: <string>(Object.values(<string>(Object.values(result)[5]))[3]),
                  postalCode: <string>(Object.values(<string>(Object.values(result)[5]))[4]),
                  Email: <string>(Object.values(result)[6]),
                  mobNo: <string>(Object.values(result)[7]),
                  paperLanguage: <string>(Object.values(result)[8]),
                }
                this.registrationForm.setValue(this.currentformdata);
              })
          }
        })

      } 
      else {
        alert("Registrations are closed 😥. Go to login menu if you have already registered.✌")
        this._router.navigateByUrl('/')
      }
    })


  }

}