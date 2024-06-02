import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef,} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatSliderModule} from "@angular/material/slider";
import {SliderComponent} from "../slider/slider.component";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'add-sound',
  templateUrl: './add-sound.html',
  standalone: true,
  imports: [MatButtonModule, MatInputModule],
})
export class AddSound {
  constructor(public dialog: MatDialog) {
  }

  public openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = {
      top: '28vh',
      left: '42vw'
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
  imports: [MatButtonModule, MatFormFieldModule, FormsModule, MatSliderModule, SliderComponent, MatInputModule, MatIconModule, MatDialogModule],
})
export class AddSoundDialog implements OnInit {
  value = 'Clear me';

  constructor(public dialogRef: MatDialogRef<AddSoundDialog>) {
  }

  ngOnInit() {
    this.dialogRef.addPanelClass('custom-dialog-container');
  }
}
