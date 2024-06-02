import {NgModule} from '@angular/core';
import {BrowserModule, HammerModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ClipboardModule} from '@angular/cdk/clipboard';

import {AppComponent} from './app.component';
import {SoundComponent} from './components/sound/sound.component';
import {PrefixComponent} from './components/prefix/prefix.component';
import {MatButtonModule} from "@angular/material/button";
import {AddSound, AddSoundDialog} from "./components/add-sound/add-sound";
import {MAT_DIALOG_DEFAULT_OPTIONS} from "@angular/material/dialog";
import {MatSliderModule} from "@angular/material/slider";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({ declarations: [AppComponent, SoundComponent, PrefixComponent],
    bootstrap: [AppComponent], imports: [BrowserModule, BrowserAnimationsModule, FormsModule, ClipboardModule, MatButtonModule, AddSound, AddSoundDialog, HammerModule, MatSliderModule, MatButtonModule, FormsModule, MatInputModule, MatCheckboxModule], providers: [{ provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true, direction: 'ltr' } }, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {
}
