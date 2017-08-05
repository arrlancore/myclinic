import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { Ng2CompleterModule } from "ng2-completer";
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from '../services/auth.service';
import { ValidateService } from '../services/validate.service';
import { MedicaldataService } from '../services/medicaldata.service'; 
import { SidebarComponent } from './sidebar/sidebar.component';
import { MedicalrecordComponent } from './medicalrecord/medicalrecord.component';
import { AuthGuard } from './guards/auth.guard';
import { NewrecordComponent } from './newrecord/newrecord.component';
import {MdTabsModule,MdInputModule,MdSelectModule,MdDatepickerModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';

import { LoadingModule } from 'ngx-loading';


const appRoutes : Routes = [
{path:'', component:HomeComponent},
{path:'register', component:RegisterComponent},
 {path:'dashbord', component:DashbordComponent, canActivate:[AuthGuard]},
 {path:'medicalrecord', component:MedicalrecordComponent, canActivate:[AuthGuard]},
 {path:'medicalrecord/:id', component:MedicalrecordComponent, canActivate:[AuthGuard]},
 {path:'newrecord', component:NewrecordComponent, canActivate:[AuthGuard]},
 {path:'patient', component:PatientComponent, canActivate:[AuthGuard]},
 {path:'doctor', component:DoctorComponent, canActivate:[AuthGuard]}

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    DashbordComponent,
    RegisterComponent,
    SidebarComponent,
    MedicalrecordComponent,
    NewrecordComponent,
    PatientComponent,
    DoctorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,    
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    Ng2CompleterModule,
    BrowserAnimationsModule,
    MdTabsModule,
    MdInputModule,
    MdSelectModule,
    LoadingModule
  ],
  providers: [AuthService,ValidateService,AuthGuard,MedicaldataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
