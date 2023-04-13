import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-prefix',
  templateUrl: './prefix.component.html',
  styleUrls: ['./prefix.component.css'],
})
@Injectable({ providedIn: 'root' })
export class PrefixComponent {
  public prefixes: string[] = ['default', 'next', 'combo'];
  public prefixLabels: string[] = [
    '!<sound>',
    '!next <sound>',
    '!combo <sound> <sound>',
  ];
  private _exportIndex: BehaviorSubject<string> = new BehaviorSubject<string>('default');
  public selectedIndex: number | undefined = undefined;

  public changeSelection(event: any, index: number) {
    this.selectedIndex = event.target.checked ? index : undefined;
    this.setPrefix;
  }

  private setPrefix(): void {
    let prefix: string = 'default';
    if (this.selectedIndex != undefined)
      prefix = this.prefixes[this.selectedIndex];
    this._exportIndex.next(prefix);
  }

  public get exportIndex(): BehaviorSubject<string> {
    return this._exportIndex;
  }

}
