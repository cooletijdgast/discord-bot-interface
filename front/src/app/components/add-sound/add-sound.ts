import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { SliderComponent } from '../slider/slider.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AddSoundService } from 'src/app/services/add-sound.service';
import { DownloadedSound } from 'src/app/model/downloaded-sound.model';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'add-sound',
  templateUrl: './add-sound.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    CommonModule,
    NgIf,
  ],
})
export class AddSound {
  constructor(public dialog: MatDialog) {}

  public openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = {
      top: '28vh',
      left: '42vw',
    };

    // Custom width and height for the dialog
    dialogConfig.width = '800px';
    dialogConfig.height = '400px';

    this.dialog.open(AddSoundDialog, dialogConfig);
  }
}

@Component({
  selector: 'add-sound-dialog',
  templateUrl: 'add-sound-dialog.html',
  styleUrls: ['add-sound.css'],
  standalone: true,
  imports: [
    MatSliderModule,
    SliderComponent,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class AddSoundDialog implements OnInit {
  linkFormControl = new FormControl('', [Validators.required]);

  public fileName = '';
  public url = '';
  public addedSound: DownloadedSound = { duration: 0, fileName: '' };

  constructor(
    public dialogRef: MatDialogRef<AddSoundDialog>,
    public addSoundService: AddSoundService
  ) {}

  public addSound() {
    if (this.url && this.fileName) {
      this.addSoundService
        .saveSoundFromUrl(this.url, this.fileName)
        .subscribe((sound) => {
          this.addedSound = sound;
        });
    }
  }

  ngOnInit() {
    this.dialogRef.addPanelClass('custom-dialog-container');
  }
}
