import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorMessages } from '../../../modules/auth/pages/registration/error-messages';
import { Products } from '../../../core/models/products';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { DialogMessagesComponent } from '../dialog-messages/dialog-messages.component';
import { DialogMessages } from '../../dialog-messages';

@Component({
  selector: 'app-dialog-add-to-basket',
  templateUrl: './dialog-add-to-trade.component.html',
  styleUrls: ['./dialog-add-to-trade.component.css']
})
export class DialogAddToTradeComponent implements OnInit, OnDestroy {

  public products: Products[] = [];
  public selectedProducts: Products[] = [];
  public addToTradeForm: FormGroup;
  public boolBasket = false;
  public clickHeat = false;
  public idProduct: number;
  private subs: Subscription = new Subscription();
  formErrors = ErrorMessages;
  dialogMessages = DialogMessages;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogAddToTradeComponent>,
    private apiService: ApiService,
    private authService: AuthService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder) {
    dialogRef.disableClose = true;
    this.getMyProducts();
  }

  ngOnInit(): void {
    this.addToTradeForm = this.formBuilder.group({
      exchangeOffer: ['', Validators.required]
    });
    this.idProduct = this.data.id;
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public closeDialogWindow(): void {
    this.dialogRef.close();
  }

  public getMyProducts(): void {
    const userId: number = this.authService.receiveIdFromStorage();
    this.subs.add(this.apiService.getUserProducts(userId).subscribe(
      (products1: Products[]): void => {
        this.products = products1;
        console.log('v: ', this.products);
      }));
  }

  public onSubmit(): void {
    this.boolBasket = true;
    let selectProductsId;
    const userId = this.authService.receiveIdFromStorage();
    if (this.selectedProducts.length > 0) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.selectedProducts.length; i++) {
        console.log(userId, ' ', this.selectedProducts[i]);
        if (userId === this.selectedProducts[i].ownerId) {
          this.selectedProducts = this.addToTradeForm.controls.exchangeOffer.value;
          selectProductsId = this.selectedProducts.map(res => {
            return res.id;
          });
          console.log(selectProductsId);
          this.apiService.addProductsForTrade(this.idProduct, selectProductsId).subscribe(res => {
              this.openDialog(this.dialogMessages.successAddForTrade, 'green');
              this.dialogRef.close();
            },
            error => {
              this.openDialog(this.dialogMessages.alreadyInTheTrade, 'red');
            });
        } else {
          this.openDialog(this.dialogMessages.badAddForTrade, 'red');
          this.dialogRef.close();
        }
      }
    } else {
      this.openDialog(this.dialogMessages.selectTradesProdIsNull, 'red');
      this.dialogRef.close();
    }
  }

  public openDialog(message: string, colorMsg: string): void {
    const timeout = 2000;
    const dialogRef = this.dialog.open(DialogMessagesComponent, {
      height: '200px',
      width: '600px',
      data: {
        msg: message,
        color: colorMsg
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
