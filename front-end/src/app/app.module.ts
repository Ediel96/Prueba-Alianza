import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './shared/components/menu/menu.component';
import { ClientComponent, DialogModal } from './pages/client/client.component';
import { ClientLookHistoryComponent } from './pages/client-look-history/client-look-history.component';
import { MaterialExampleModule } from './shared/module/material.module';
import { TableComponent } from './pages/client/table/table.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ClientComponent,
    ClientLookHistoryComponent,
    TableComponent,
    DialogModal
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
