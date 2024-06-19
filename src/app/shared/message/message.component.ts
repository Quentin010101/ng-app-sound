import { Component, inject } from '@angular/core';
import { MessageService } from '../../service/utils/message.service';
import { Message } from '../../interface/utils/message.interface';
import { environnement } from '../../../environnement';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  private _messageService = inject(MessageService)
  private duration = environnement.message_pop_up_duration
  public messages: Message[] = []


  constructor(){
    this._messageService.$messageSubject.subscribe(message => {
      this.messages.push(message)
      this.setDeleteNextMessageTime()
    })
  }

  private setDeleteNextMessageTime(){
    setTimeout(() => {
      this.messages.shift()
    }, this.duration)
  }
}
