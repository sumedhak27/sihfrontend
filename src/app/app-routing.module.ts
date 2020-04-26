import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { registrationFormComponent } from '../app/registration_form/registration_form.component';
import { HomeComponent } from '../app/home/home.component';
import { LoginComponent } from '../app/Login/Login.component';
import { ProfileComponent } from '../app/profile/profile.component';
import { FirebaseAuthComponent } from '../app/firebase-auth/user-profile.component'


const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:'register', component: registrationFormComponent },
  { path:'login', component: LoginComponent },
  { path:'profile', component: ProfileComponent },
  { path:'firebase-auth', component:  FirebaseAuthComponent},

  // { path:'registrationFormComponent_2', component: registrationFormComponent_2 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [registrationFormComponent]
