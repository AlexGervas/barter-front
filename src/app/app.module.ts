import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './modules/auth/pages/auth/auth.component';
import { RegistrationComponent } from './modules/auth/pages/registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NotFoundComponent } from './modules/home/pages/not-found/not-found.component';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { DialogSuccessDataComponent } from './modules/auth/pages/registration/dialog-success-data/dialog-success-data.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MenuComponent } from './modules/home/components/menu/menu.component';
import { PersonalRoomComponent } from './modules/home/pages/personal-room/personal-room.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FilterStatusPipe } from './shared/pipes/filter-status.pipe';
import { SidenavComponent } from './modules/home/components/sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FavoritesComponent } from './modules/home/pages/favorites/favorites.component';
import { AddProductComponent } from './modules/home/pages/add-product/add-product.component';
import { MatCardModule } from '@angular/material/card';
import { DialogMessagesComponent } from './shared/dialogs/dialog-messages/dialog-messages.component';
import { TradeComponent } from './modules/home/pages/trade/trade.component';
import { ProductInformationComponent } from './modules/home/pages/product-information/product-information.component';
import { DialogAddToTradeComponent } from './shared/dialogs/dialog-add-to-trade/dialog-add-to-trade.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogAddTradePersonalRoomComponent } from './shared/dialogs/dialog-add-trade-personal-room/dialog-add-trade-personal-room.component';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegistrationComponent,
    NotFoundComponent,
    HomeComponent,
    DialogSuccessDataComponent,
    MenuComponent,
    PersonalRoomComponent,
    FilterStatusPipe,
    SidenavComponent,
    FavoritesComponent,
    AddProductComponent,
    DialogMessagesComponent,
    TradeComponent,
    ProductInformationComponent,
    DialogAddToTradeComponent,
    DialogAddTradePersonalRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTooltipModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatBadgeModule,
    MultiSelectModule,
    FormsModule,
    FileUploadModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
