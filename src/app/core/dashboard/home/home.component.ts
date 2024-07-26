import { Component } from '@angular/core';
import { ChipComponent } from '../../../shared/chip/chip.component';
import { LoaderComponent } from '../../../shared/loader/loader.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
