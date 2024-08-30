import { Component, inject } from '@angular/core';
import { OfflineService } from '../../service/utils/offline.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-offline',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './offline.component.html',
  styleUrl: './offline.component.scss'
})
export class OfflineComponent {

  private _offlineService = inject(OfflineService)

  online: boolean = true

  ngOnInit(){
    console.log("tre")
    this._offlineService.status.subscribe((value)=> {
      this.online = value
    })
  }
}
