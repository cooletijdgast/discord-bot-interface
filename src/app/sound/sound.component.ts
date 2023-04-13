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
  public value: string = '';
  public prefix: string = '';

  constructor(
    private soundService: SoundService,
    private clipboard: Clipboard,
    public prefixComp: PrefixComponent
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
    this.getPrefix();
    console.log(this.prefix);
  }

  private getPrefix(): void{
    this.prefixComp.exportIndex.subscribe({
      next: (v) => (this.prefix = v),
    })
  }
}
