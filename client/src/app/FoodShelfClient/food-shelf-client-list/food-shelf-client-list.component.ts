import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { Message } from '../../FoodShelfClient/message';
import { MessageService } from '../../FoodShelfClient/foodshelfclient.service';
/**
 * A component that displays a list of users, either as a grid
 * of cards or as a vertical list.
 *
 * The component supports local filtering by name and/or company,
 * and remote filtering (i.e., filtering by the server) by
 * role and/or age. These choices are fairly arbitrary here,
 * but in "real" projects you want to think about where it
 * makes the most sense to do the filtering.
 */
@Component({
  selector: 'app-food-shelf-list-component',
  templateUrl: 'food-shelf-client-list.component.html',
  styleUrls: ['./food-shelf-client-list.component.scss'],
  providers: []
})

export class MessageListComponent implements OnInit, OnDestroy  {
  // These are public so that tests can reference them (.spec.ts)
  public serverFilteredMessages: Message[];
  public filteredMessages: Message[];

  public messageName: string;
  public messageBody: string;


  private ngUnsubscribe = new Subject<void>();


  /**
   * This constructor injects both an instance of `UserService`
   * and an instance of `MatSnackBar` into this component.
   * `UserService` lets us interact with the server.
   *
   * @param messageService the `UserService` used to get users from the server
   * @param snackBar the `MatSnackBar` used to display feedback
   */
  constructor(private messageService: MessageService, private snackBar: MatSnackBar) {
    // Nothing here – everything is in the injection parameters.
  }

  /**
   * Get the users from the server, filtered by the role and age specified
   * in the GUI.
   */
  getMessagesFromServer(): void {
    // A user-list-component is paying attention to userService.getUsers
    // (which is an Observable<User[]>)
    // (for more on Observable, see: https://reactivex.io/documentation/observable.html)
    // and we are specifically watching for role and age whenever the User[] gets updated
    this.messageService.getMessages({
      name: this.messageName,
      body: this.messageBody
    }).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      // Next time we see a change in the Observable<User[]>,
      // refer to that User[] as returnedUsers here and do the steps in the {}
      next: (returnedMessages) => {
        // First, update the array of serverFilteredUsers to be the User[] in the observable
        this.serverFilteredMessages = returnedMessages;
        // Then update the filters for our client-side filtering as described in this method
        this.updateFilter();
      },
      // If we observe an error in that Observable, put that message in a snackbar so we can learn more
      error: (err) => {
        let msg = '';
        if (err.error instanceof ErrorEvent) {
          msg = `Problem in the client – Error: ${err.error.msg}`;
        } else {
          msg = `Problem contacting the server – Error Code: ${err.status}\nMessage: ${err.msg}`;
        }
        this.snackBar.open(
          msg,
          'OK',
          // The message will disappear after 6 seconds.
          { duration: 6000 });
      },
      // Once the observable has completed successfully
      // complete: () => console.log('Users were filtered on the server')
    });
  }

  /**
   * Called when the filtering information is changed in the GUI so we can
   * get an updated list of `filteredUsers`.
   */
  public updateFilter(): void {
    this.filteredMessages = this.messageService.filterMessages(
      this.serverFilteredMessages, { name: this.messageName, body: this.messageBody });
  }

  /**
   * Starts an asynchronous operation to update the users list
   *
   */
  ngOnInit(): void {
    this.getMessagesFromServer();
  }

  /**
   * When this component is destroyed, we should unsubscribe to any
   * outstanding requests.
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
