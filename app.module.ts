import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { SortPipe } from './sort.pipe';
import { SocketType } from 'dgram';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [BrowserModule,AppRoutingModule,HttpClientModule,ReactiveFormsModule,FormsModule],
  declarations: [AppComponent, HelloComponent, SortPipe],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}



