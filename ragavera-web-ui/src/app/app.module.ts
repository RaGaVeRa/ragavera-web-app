import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TtsComponent } from './tts/tts.component';
import { OcrComponent } from './ocr/ocr.component';
import { RechargeComponent } from './recharge/recharge.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { BillingInfoComponent } from './billing-info/billing-info.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    TtsComponent,
    OcrComponent,
    RechargeComponent,
    TransactionsComponent,
    BillingInfoComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
