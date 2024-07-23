import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { heroUser, heroLockClosed, heroPaperAirplane , heroArrowRight, heroAdjustmentsHorizontal, heroHome, heroPencil, heroBookOpen, heroPower, heroMusicalNote, heroFolder, heroCheck } from '@ng-icons/heroicons/outline';
import { heroUserSolid, heroLockClosedSolid, heroPaperAirplaneSolid  , heroArrowRightSolid, heroAdjustmentsHorizontalSolid, heroHomeSolid, heroPencilSolid, heroBookOpenSolid, heroPowerSolid, heroMusicalNoteSolid, heroFolderSolid, heroCheckSolid } from '@ng-icons/heroicons/solid';
import { NgIconComponent , provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ heroUser, heroUserSolid, heroLockClosed, heroLockClosedSolid, heroPaperAirplane, heroPaperAirplaneSolid,
    heroArrowRight, heroArrowRightSolid, heroAdjustmentsHorizontal, heroAdjustmentsHorizontalSolid, heroHome, heroHomeSolid,heroPencil, heroBookOpen,
    heroPencilSolid, heroBookOpenSolid, heroPower, heroPowerSolid, heroMusicalNote, heroFolder, heroMusicalNoteSolid, heroFolderSolid, heroCheck, heroCheckSolid
   })],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  @Input() icon!: string | null
  @Input() solid: boolean = false 
  @Input() color: boolean = false 
  @Input() size: string = '1.1rem' 

  public name!: string | null
  public nameSolid!: string | null

  ngOnInit(){
    if(this.icon) this.setName(this.icon);
  }

  private setName(iconName: string){
    switch(iconName){
      case 'user' : this.name = 'heroUser'; this.nameSolid = 'heroUserSolid'; break;
      case 'lock' : this.name = 'heroLockClosed'; this.nameSolid = 'heroLockClosedSolid'; break;
      case 'send' : this.name = 'heroPaperAirplane'; this.nameSolid = 'heroPaperAirplaneSolid'; break;
      case 'arrow-right' : this.name = 'heroArrowRight'; this.nameSolid = 'heroArrowRightSolid'; break;
      case 'setting' : this.name = 'heroAdjustmentsHorizontal'; this.nameSolid = 'heroAdjustmentsHorizontalSolid'; break;
      case 'home' : this.name = 'heroHome'; this.nameSolid = 'heroHomeSolid'; break;
      case 'pencil' : this.name = 'heroPencil'; this.nameSolid = 'heroPencilSolid'; break;
      case 'book' : this.name = 'heroBookOpen'; this.nameSolid = 'heroBookOpenSolid'; break;
      case 'power' : this.name = 'heroPower'; this.nameSolid = 'heroPowerSolid'; break;
      case 'folder' : this.name = 'heroFolder'; this.nameSolid = 'heroFolderSolid'; break;
      case 'musique' : this.name = 'heroMusicalNote'; this.nameSolid = 'heroMusicalNoteSolid'; break;
      case 'check' : this.name = 'heroCheck'; this.nameSolid = 'heroCheckSolid'; break;
      default: break;
    }
    
  }
}
