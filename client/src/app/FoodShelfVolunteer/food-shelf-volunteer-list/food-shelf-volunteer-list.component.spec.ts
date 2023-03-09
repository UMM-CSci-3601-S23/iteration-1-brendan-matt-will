import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { MockMessageService } from '../../../testing/message.service.mock';
import { Message } from '../../FoodShelfClient/message';
import { VolunteerListComponent } from './food-shelf-volunteer-list.component' ;
import { MessageService } from '../../FoodShelfClient/foodshelfclient.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const COMMON_IMPORTS: unknown[] = [
  FormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonModule,
  MatInputModule,
  MatExpansionModule,
  MatTooltipModule,
  MatListModule,
  MatDividerModule,
  MatRadioModule,
  MatIconModule,
  MatSnackBarModule,
  BrowserAnimationsModule,
  RouterTestingModule,
];

describe('Message list', () => {

  let volunteerList: VolunteerListComponent;
  let fixture: ComponentFixture<VolunteerListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [VolunteerListComponent],

      providers: [{ provide: MessageService, useValue: new MockMessageService() }]
    });
  });

  // This constructs the `userList` (declared
  // above) that will be used throughout the tests.
  beforeEach(waitForAsync(() => {
  // Compile all the components in the test bed
  // so that everything's ready to go.
    TestBed.compileComponents().then(() => {
      /* Create a fixture of the UserListComponent. That
       * allows us to get an instance of the component
       * (userList, below) that we can control in
       * the tests.
       */
      fixture = TestBed.createComponent(VolunteerListComponent);
      volunteerList = fixture.componentInstance;
      /* Tells Angular to sync the data bindings between
       * the model and the DOM. This ensures, e.g., that the
       * `userList` component actually requests the list
       * of users from the `MockUserService` so that it's
       * up to date before we start running tests on it.
       */
      fixture.detectChanges();
    });
  }));

  it('contains all the messages', () => {
    expect(volunteerList.serverFilteredMessages.length).toBe(3);
  });

  it('contains a message with name \'Chris\'', () => {
    expect(volunteerList.serverFilteredMessages.some((message: Message) => message.name === 'Chris')).toBe(true);
  });

  it('contain a message with name \'John\'', () => {
    expect(volunteerList.serverFilteredMessages.some((message: Message) => message.name === 'John')).toBe(true);
  });

  it('doesn\'t contain a message with name \'Santa\'', () => {
    expect(volunteerList.serverFilteredMessages.some((message: Message) => message.name === 'Santa')).toBe(false);
  });

  it('has one message with body "I dont want anything"', () => {
    expect(volunteerList.serverFilteredMessages.filter((message: Message) => message.body === 'I want beans').length).toBe(1);
  });
});
