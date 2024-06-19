import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../../interface/utils/message.interface';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  $messageSubject = new Subject<Message>()

  constructor() { }
}
