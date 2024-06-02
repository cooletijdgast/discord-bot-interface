import {Component, OnInit} from "@angular/core";
import {MatSliderModule} from "@angular/material/slider";
import {FormsModule} from "@angular/forms";
import {AddSoundService} from "../../services/add-sound.service";

@Component({
  selector: 'slider',
  templateUrl: 'slider.component.html',
  styleUrls: ['slider.component.css'],
  standalone: true,
  imports: [MatSliderModule, FormsModule],
})
export class SliderComponent implements OnInit {
  disabled = false;
  max = 100;
  min = 0;
  showTicks = true;
  step = 1;
  thumbLabel = true;
  begin = this.min;
  end = this.max;

  constructor(private addSoundService: AddSoundService) {
  }

  ngOnInit() {

  }
}
