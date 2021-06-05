import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import { User } from '../../../../core/models/user';
import { AuthService } from '../../../../core/services/auth.service';
import { Products } from '../../../../core/models/products';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddTradePersonalRoomComponent } from '../../../../shared/dialogs/dialog-add-trade-personal-room/dialog-add-trade-personal-room.component';
import { DialogMessagesComponent } from '../../../../shared/dialogs/dialog-messages/dialog-messages.component';

@Component({
  selector: 'app-personal-room',
  templateUrl: './personal-room.component.html',
  styleUrls: ['./personal-room.component.css']
})
export class PersonalRoomComponent implements OnInit, OnDestroy {

  public user: User = {
    id: 0, name: '', email: '', login: '', password: '', favorites: []
  };
  public products: Products[] = [];
  public message = 'Вы не добавляли свой товар';
  private subs: Subscription = new Subscription();
  public clickHeat = false;
  public boolBasket = false;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router) {
  }

  ngOnInit(): void {
    this.displayProducts();
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private displayProducts(): void {
    const userId: number = this.authService.receiveIdFromStorage();
    this.subs.add(this.apiService.getUser(userId).subscribe(
      (user1: User): void => {
        this.user = user1;
      }));
    this.subs.add(this.apiService.getUserProducts(userId).subscribe(
      (products1: Products[]): void => {
        this.products = products1;
        console.log(products1);
      }));
  }

  public deleteMyProduct(e, idProduct: number): void {
    this.apiService.deleteMyProduct(idProduct).subscribe(() => {
      this.displayProducts();
    });
  }

  public selectedProductForTrade(e, idProduct: number): void {
    this.clickHeat = false;
    const dialogRef = this.dialog.open(DialogAddTradePersonalRoomComponent, {
      height: '400px',
      width: '700px',
      data: {
        id: idProduct
      }
    });
    dialogRef.updatePosition({top: '10%'});
    dialogRef.afterClosed().subscribe(res => {
      this.boolBasket = true;
      if (res) {
        this.openDialog();
      }
    });
  }

  public getProductInformation(product): void {
    let link = 'home/product-information/';
    link = link.concat(product.replace(' ', '+'));
    this.router.navigate([]).then(result => {
      window.open(link, '_blank');
    });
  }

  public openDialog(): void {
    const timeout = 2000;
    const dialogRef = this.dialog.open(DialogMessagesComponent, {
      height: '200px',
      width: '600px',
      data: {
        dataBasket: this.boolBasket,
        heart: this.clickHeat
      }
    });
    dialogRef.updatePosition({top: '80px', left: '35%'});
    dialogRef.afterOpened().subscribe(_ => {
      setTimeout(() => {
        dialogRef.close();
      }, timeout);
    });
  }

}
