import {Component, OnInit} from '@angular/core';
import {SoundService} from '../../services/sound.service';
import {SoundComponent} from '../sound/sound.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {AddSound} from "../add-sound/add-sound";

@Component({
  selector: 'prefix',
  templateUrl: './prefix.component.html',
  styleUrls: ['./prefix.component.css'],
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatInputModule,
    FormsModule,
    AddSound
  ]
})
export class PrefixComponent implements OnInit {
  public prefixes: string[] = ['default', 'next', 'combo'];
  public prefixLabels: string = '';
  public default: string = '<sound>';
  public next: string = '<sound>';
  public combo: string = '<sound> <sound>';
  public selectedIndex: number | undefined = undefined;
  protected readonly undefined = undefined;

  constructor(public soundService: SoundService, private soundComponent: SoundComponent) {
  }

  ngOnInit() {
    this.soundService.default.subscribe((v) => (this.default = v));
    this.soundService.next.subscribe((v) => (this.next = v));
    this.soundService.combo.subscribe((v) => (this.combo = v));
  }

  public changeSelection(event: any, index: number) {
    this.selectedIndex = event.target.checked ? index : undefined;
    this.setSelected();
    this.setPrefix();
    this.soundService.resetPressed(this.soundComponent.sounds);
  }

  public refreshSounds() {
    console.log('prefix')
    this.soundComponent.getSounds();
  }

  private setPrefix(): void {
    let prefix: string = 'default';
    if (this.selectedIndex != undefined) {
      prefix = this.prefixes[this.selectedIndex];
    }
    this.soundService.exportIndex.next(prefix);
  }

  private setSelected(): void {
    switch (this.selectedIndex) {
      case 1:
        this.soundService.nextSelect = true;
        this.soundService.defaultSelect = false;
        break;
      case 2:
        this.soundService.comboSelect = true;
        this.soundService.defaultSelect = false;
        break;
      default:
        this.soundService.defaultSelect = true;
        break;
    }
    this.soundService.resetPrefixValues();
  }
}
