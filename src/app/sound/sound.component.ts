import { Component } from '@angular/core';
import { SoundService } from '../services/sound.service';
import { Sound } from '../model/sound';

@Component({
  selector: 'app-sound',
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.css'],
})
export class SoundComponent {
  public sounds: Sound[] = [];

  constructor(private soundService: SoundService) {}

  private getSounds(): void {
    this.soundService.getSounds().subscribe((sounds) => {
      this.sounds = sounds;
      this.sortOnName();
    });
  }

  ngOnInit(): void {
    this.getSounds();
    // console.log(this.sounds);
    // console.log(this.sounds);
  }

  private sortOnName(): void {
    this.sounds = this.sounds.sort((a, b) => a.name.localeCompare(b.name));
  }
}
