import { Component } from '@angular/core';
import { SoundService } from '../services/sound.service';
import { Sound } from '../model/sound';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-sound',
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.css'],
})
export class SoundComponent {
  public sounds: Sound[] = [];
  public value: string = '';

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
    this.clipboard.copy(`!${value}`);
  }
}
