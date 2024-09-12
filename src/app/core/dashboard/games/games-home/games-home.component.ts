import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { BackComponent } from '../../../../shared/back/back.component';
import { CardComponent } from '../../../../shared/card/card.component';

@Component({
  selector: 'app-games-home',
  standalone: true,
  imports: [RouterModule, CardComponent],
  templateUrl: './games-home.component.html',
  styleUrl: './games-home.component.scss'
})
export class GamesHomeComponent {

}
