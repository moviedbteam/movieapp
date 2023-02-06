import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ActionbarComponent } from './actionbar/actionbar.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { PrintDurationPipe } from './shared/pipes/print-duration.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DetailComponent,
    SearchbarComponent,
    ActionbarComponent,
    LoginFormComponent,
    CommentFormComponent,
    PrintDurationPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    ReactiveFormsModule,
    BrowserAnimationsModule,

    MatSnackBarModule,
  ],
  
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
