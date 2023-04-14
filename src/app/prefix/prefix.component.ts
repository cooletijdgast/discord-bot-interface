import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SoundService } from '../services/sound.service';

@Component({
  selector: 'app-prefix',
  templateUrl: './prefix.component.html',
  styleUrls: ['./prefix.component.css'],
})
export class PrefixComponent {
  public prefixes: string[] = ['default', 'next', 'combo'];
  public prefixLabels: string[] = [
    '!<sound>',
    '!next <sound>',
    '!combo <sound> <sound>',
  ];

  constructor(private soundService: SoundService) {}

  public selectedIndex: number | undefined = undefined;

  public changeSelection(event: any, index: number) {
    this.selectedIndex = event.target.checked ? index : undefined;
    this.setPrefix();
  }

  private setPrefix(): void {
    let prefix: string = 'default';
    if (this.selectedIndex != undefined) {
      prefix = this.prefixes[this.selectedIndex];
    }
    this.soundService.exportIndex.next(prefix);
  }
}
