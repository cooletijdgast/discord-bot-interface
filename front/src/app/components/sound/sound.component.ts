import {Component, Injectable} from '@angular/core';
import {SoundService} from '../../services/sound.service';
import {SavedSound} from '../../model/saved-sound.model';
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-sound',
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class SoundComponent {
  public sounds: SavedSound[] = [];
  public maximumSelectedReached: boolean = false;

  private prefix: string = '';
  private valueForCopy: string = '';
  private allowMultiple: boolean = false;
  private comboCount: number = 0;

  constructor(
    private soundService: SoundService,
    private clipboard: Clipboard
  ) {
  }

  public copyToClipboard(value: string) {
    this.getCurrentPrefix();
    this.setPrefixForCopying();
    if (this.prefix == 'combo ') {
      this.handleComboSettings(value);
    } else {
      this.allowMultiple = false;
      this.valueForCopy = value;
    }

    this.setSelectedSoundForDisplay(this.valueForCopy);
    this.clipboard.copy(`!${this.prefix}${this.valueForCopy}`);

    if (!this.allowMultiple) {
      this.soundService.resetPressed(this.sounds);
      this.valueForCopy = '';
    }
  }

  public getSounds(): void {
    this.soundService.getSounds().subscribe((sounds) => {
      this.sounds = sounds;
      this.sortOnName();
    });
  }

  ngOnInit(): void {
    this.getSounds();
  }

  private sortOnName(): void {
    this.sounds = this.sounds.sort((a, b) => a.name.localeCompare(b.name));
  }

  private getCurrentPrefix(): void {
    this.soundService.exportIndex.subscribe({
      next: (v) => (this.prefix = v),
    });
  }

  private setPrefixForCopying(): void {
    switch (this.prefix) {
      case 'default':
        this.prefix = '';
        break;
      case 'next':
        this.prefix = 'next ';
        break;
      case 'combo':
        this.prefix = 'combo ';
        break;
      default:
        break;
    }
  }

  private setSelectedSoundForDisplay(value: string): void {
    switch (this.prefix) {
      case '':
        this.soundService.default.next(value);
        break;
      case 'next ':
        this.soundService.next.next(value);
        break;
      case 'combo ':
        this.soundService.combo.next(value);
        break;
      default:
        break;
    }
  }

  private handleComboSettings(value: string): void {
    if (this.comboCount < 5 && !(this.valueForCopy === (value + ' '))) {
      this.allowMultiple = true;
      this.valueForCopy = this.valueForCopy + value + ' ';
      this.comboCount++;
      console.log(this.valueForCopy)
    } else {
      this.maximumSelectedReached = true
    }
  }
}
