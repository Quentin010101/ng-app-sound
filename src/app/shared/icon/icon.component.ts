import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { heroUser, heroLockClosed } from '@ng-icons/heroicons/outline';
import { heroUserSolid, heroLockClosedSolid } from '@ng-icons/heroicons/solid';
import { NgIconComponent , provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ heroUser, heroUserSolid, heroLockClosed, heroLockClosedSolid })],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  @Input() icon!: string | null
  @Input() solid: boolean = false 

  public name!: string | null
  public nameSolid!: string | null

  ngOnInit(){
    if(this.icon) this.setName(this.icon);
  }

  private setName(iconName: string){
    switch(iconName){
      case 'user' : this.name = 'heroUser'; this.nameSolid = 'heroUserSolid'; break;
      case 'lock' : this.name = 'heroLockClosed'; this.nameSolid = 'heroLockClosedSolid'; break;
      default: break;
    }
    
  }
}
