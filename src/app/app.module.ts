import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AgmCoreModule } from '@agm/core'

import { AppComponent } from './app.component';
import { RegistroComponent } from './components/registro/registro.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    MenuComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCqxLlIIJcj2ItDwwu3FwliQmE3lPh_pw0'
    })  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
