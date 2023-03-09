import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Message } from '../app/FoodShelfClient/message';
import { MessageService } from '../app/FoodShelfClient/foodshelfclient.service';


@Injectable({
  providedIn: AppComponent
})
export class MockMessageService extends MessageService {
  static testMessages: Message[] = [
    {
      _id: 'chris_id',
      name: 'Chris',
      body: 'I want beans',
    },
    {
      _id: 'John_id',
      name: 'John',
      body: 'I do not want anything',
    },
    {
      _id: 'Mason_id',
      name: 'Mason',
      body: 'FoodAlert is dumb',
    }
  ];

  constructor() {
    super(null);
  }

  getMessages(_filters: { name?: string; body?: string }): Observable<Message[]> {
    // Our goal here isn't to test (and thus rewrite) the service, so we'll
    // keep it simple and just return the test users regardless of what
    // filters are passed in.
    //
    // The `of()` function converts a regular object or value into an
    // `Observable` of that object or value.
    return of(MockMessageService.testMessages);
  }

  getMessageById(id: string): Observable<Message> {
    // If the specified ID is for one of the first two test users,
    // return that user, otherwise return `null` so
    // we can test illegal user requests.
    // If you need more, just add those in too.
    if (id === MockMessageService.testMessages[0]._id) {
      return of(MockMessageService.testMessages[0]);
    } else if (id === MockMessageService.testMessages[1]._id) {
      return of(MockMessageService.testMessages[1]);
    } else {
      return of(null);
    }
  }
}
