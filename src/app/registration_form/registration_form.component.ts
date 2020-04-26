import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient} from '@angular/common/http';

// import {Component} from '@angular/core';
@Component({
  selector: 'app-registration_form',
  templateUrl: './registration_form.component.html',
  styleUrls: ['./registration_form.component.scss']
})



export class registrationFormComponent implements OnInit {
  constructor( private fb : FormBuilder, 
              private http : HttpClient,
          ) { }

  formData:object;
  userId: string;
  status = {};
  userIdRecieved = false;
  // password = null;

  // Photo Upload
  public imagePath;
  imgURL: any;
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
    // selfFirstName: ['', Validators.required],
    // selfLastName: ['', Validators.required],
    // fatherFirstName: ['', Validators.required],
    // fatherLastName: ['', Validators.required],
    // motherFirstName: ['', Validators.required],
    // motherLastName: ['', Validators.required],
    // DOB: ['', Validators.required],
    // streetAddress: ['', Validators.required],
    // city: ['', Validators.required],
    // district: ['', Validators.required],
    // state: ['', Validators.required],
    // postalCode: ['', Validators.required, Validators.pattern('d{6}')],
    // Email: ['', Validators.required, Validators.email],
    // mobNo: ['', Validators.required, Validators.pattern("^(\\+?\\d{1,4}[\\s-])?(?!0+\\s+,?$)\\d{10}\\s*,?$")],
    // paperLanguage: ['', Validators.required],
    // teacherCategory: ['', Validators.required],

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

  onSubmit () {


    this.formData = { _id: this.userId,
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
                      paperLanguage: this.registrationForm.controls['paperLanguage'].value
                      
                    };
    console.warn(this.formData)
    
    let promise1 = this.http.post("https://glacial-sands-20481.herokuapp.com/form/storeForm", this.formData )
    promise1.subscribe((res) => {
    let response = res
      console.log(res)
        alert("Form Submitted Successfully!!✔")
    },
    (err) => {
      console.warn(err)
    } 
    )
    console.log(Object.keys(this.formData));
    
  }

  setUserIdPass() {
    console.log("YOooo!!", this.password.controls['pass1'].value);
    if((this.password.controls['pass1'].value!='' && this.password.controls['pass2'].value!='') && (this.password.controls['pass1'].value===this.password.controls['pass2'].value)){
      let body = {
        _id : this.userId,
        key : this.password
      }
      let p = this.http.post("https://glacial-sands-20481.herokuapp.com/form/newUser", body)
      p.subscribe(res => {
        console.log(res)
        alert("Password Set.")
      })
      console.log(p)
      this.userIdRecieved = true;
    }
    else {
      alert("Wrong Input in password Or password does not match.")
    }
    
  }

  

  ngOnInit() {
    let promise = this.http.get("https://glacial-sands-20481.herokuapp.com/form/getNewID")
    promise.subscribe((res) => {
      this.userId = <string>(Object.values(res)[0]);
      console.log(typeof(Object.values(res)[0]), "  " , Object.values(res)[0])
    })
    
  }

}