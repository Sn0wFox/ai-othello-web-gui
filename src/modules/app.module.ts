import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';

import { AppComponent }   from '../components/app/app.component';
import { BoardComponent } from '../components/board/board.component';

import { PrologService }  from '../services/prolog/prolog.service';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  declarations: [
    AppComponent,
    BoardComponent
  ],
  providers: [
    PrologService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  // Nothing else to do
}