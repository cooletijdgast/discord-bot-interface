import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { AppComponent } from './app.component';
import { SoundComponent } from './sound/sound.component';
import { PrefixComponent } from './prefix/prefix.component';
import { DvdBounceComponent } from './dvd-bounce/dvd-bounce.component';
import { MaterialExampleModule } from './material.module';

@NgModule({
  declarations: [AppComponent, SoundComponent, PrefixComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, ClipboardModule, MaterialExampleModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
