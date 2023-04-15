import { Component, Injectable } from '@angular/core';
import { SoundService } from '../services/sound.service';
import { Sound } from '../model/sound';
import { Clipboard } from '@angular/cdk/clipboard';
import { PrefixComponent } from '../prefix/prefix.component';

@Component({
  selector: 'app-sound',
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.css'],
})
export class SoundComponent {
  public sounds: Sound[] = [];
  private prefix: string = '';
  private valueForCopy: string = '';
  private allowMultiple: boolean = false;

  constructor(
    private soundService: SoundService,
    private clipboard: Clipboard
  ) {}

  private getSounds(): void {
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

  public copyToClipboard(value: string) {
    this.getPrefix();
    this.setPrefixForCopying(this.valueForCopy);
    if (this.prefix == 'combo ') {
      this.allowMultiple = true;
      this.valueForCopy = this.valueForCopy + value + ' ';
    } else {
      this.allowMultiple = false;
      this.valueForCopy = value;
    }
    if (!this.allowMultiple) {
      this.soundService.resetPressed(this.sounds);
    }
    this.showSelected(this.valueForCopy);
    this.clipboard.copy(`!${this.prefix}${this.valueForCopy}`);
    this.soundService.resetPressed(this.sounds);
  }

  private getPrefix(): void {
    this.soundService.exportIndex.subscribe({
      next: (v) => (this.prefix = v),
    });
  }

  private setPrefixForCopying(value: string): void {
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

  private showSelected(value: string): void {
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
}
