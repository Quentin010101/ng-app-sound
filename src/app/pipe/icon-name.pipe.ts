import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconName',
  standalone: true
})
export class IconNamePipe implements PipeTransform {

  transform(value: string): string {
    let returValue = 'document'
    let arr = value.split('.')
    switch(arr[arr.length - 1].toLowerCase()){
      case 'png' : returValue = 'photo'; break;
      case 'jpg' : returValue = 'photo'; break;
      case 'gif' : returValue = 'photo'; break;
      case 'mp3' : returValue = 'musique'; break;
      case 'wav' : returValue = 'musique'; break;
    }
    return returValue;
  }

}
