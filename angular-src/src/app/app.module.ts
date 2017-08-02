import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from '../services/auth.service';
import { ValidateService } from '../services/validate.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MedicalrecordComponent } from './medicalrecord/medicalrecord.component';
import { AuthGuard } from './guards/auth.guard';
import { NewrecordComponent } from './newrecord/newrecord.component'


const appRoutes : Routes = [
{path:'', component:HomeComponent},
{path:'register', component:RegisterComponent},
// {path:'login', component:LoginComponent},
// {path:'profile', component:ProfileComponent, canActivate:[AuthGuard]},
 {path:'dashbord', component:DashbordComponent, canActivate:[AuthGuard]},
 {path:'medicalrecord', component:MedicalrecordComponent, canActivate:[AuthGuard]}

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
    NewrecordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,    
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [AuthService,ValidateService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
