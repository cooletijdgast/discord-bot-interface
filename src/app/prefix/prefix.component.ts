import { Component } from '@angular/core';

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
    '!combo <sound> <sound>(max 2)',
  ];
  public selectedIndex: number | undefined = undefined;

  public changeSelection(event: any, index: number) {
    this.selectedIndex = event.target.checked ? index : undefined;
  }
}
