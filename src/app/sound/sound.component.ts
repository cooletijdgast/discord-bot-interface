import { Component } from '@angular/core';
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
  private prefixForCopy: string = ''; 

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

  public copy(value: string) {
    this.getPrefix();
    this.setSelected(value);
    this.clipboard.copy(`!${this.prefixForCopy}${value}`);
  }

  private getPrefix(): void {
    this.soundService.exportIndex.subscribe({
      next: (v) => (this.prefix = v),
    });
  }

  private setSelected(value: string): void {
    switch (this.prefix) {
      case 'default':
        this.prefixForCopy = ''
        this.soundService.default.next(value);
        break;
      case 'next':
        this.prefixForCopy = 'next '
        this.soundService.next.next(value);
        break;
      case 'combo':
        this.prefixForCopy = 'combo '
        this.soundService.combo.next(value);
        break;
      default:
        break;
    }
  }
}
