import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Message } from '../FoodShelfClient/message';
import { map } from 'rxjs/operators';


/**
 * Service that provides the interface for getting information
 * about `Users` from the server.
 */
@Injectable({
  providedIn: `root`
})
export class MessageService {
  // The URL for the users part of the server API.
  readonly messageUrl: string = `${environment.apiUrl}messages`;

  private readonly nameKey = 'name';
  private readonly bodyKey = 'body';



  // The private `HttpClient` is *injected* into the service
  // by the Angular framework. This allows the system to create
  // only one `HttpClient` and share that across all services
  // that need it, and it allows us to inject a mock version
  // of `HttpClient` in the unit tests so they don't have to
  // make "real" HTTP calls to a server that might not exist or
  // might not be currently running.
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Get all the users from the server, filtered by the information
   * in the `filters` map.
   *
   * It would be more consistent with `UserListComponent` if this
   * only supported filtering on age and role, and left company to
   * just be in `filterUsers()` below. We've included it here, though,
   * to provide some additional examples.
   *
   * @param filters a map that allows us to specify a target role, age,
   *  or company to filter by, or any combination of those
   * @returns an `Observable` of an array of `Users`. Wrapping the array
   *  in an `Observable` means that other bits of of code can `subscribe` to
   *  the result (the `Observable`) and get the results that come back
   *  from the server after a possibly substantial delay (because we're
   *  contacting a remote server over the Internet).
   */
  getMessages(filters?: { name?: string; body?: string}): Observable<Message[]> {
    // `HttpParams` is essentially just a map used to hold key-value
    // pairs that are then encoded as "?key1=value1&key2=value2&…" in
    // the URL when we make the call to `.get()` below.
    let httpParams: HttpParams = new HttpParams();
    if (filters) {
      if (filters.name) {
        httpParams = httpParams.set(this.nameKey, filters.name);
      }
      if (filters.body) {
        httpParams = httpParams.set(this.bodyKey, filters.body.toString());
      }

    }
    // Send the HTTP GET request with the given URL and parameters.
    // That will return the desired `Observable<User[]>`.
    return this.httpClient.get<Message[]>(this.messageUrl, {
      params: httpParams,
    });
  }

  /**
   * Get the `User` with the specified ID.
   *
   * @param id the ID of the desired user
   * @returns an `Observable` containing the resulting user.
   */

  filterMessages(messages: Message[], filters: { name?: string; body?: string }): Message[] {
    let filteredMessages = messages;

    // Filter by name
    if (filters.name) {
      filters.name = filters.name.toLowerCase();
      filteredMessages = filteredMessages.filter(user => user.name.toLowerCase().indexOf(filters.name) !== -1);
    }

    // Filter by body
    if (filters.body) {
      filters.body = filters.body.toLowerCase();
      filteredMessages = filteredMessages.filter(user => user.body.toLowerCase().indexOf(filters.body) !== -1);
    }

    return filteredMessages;
  }

  addMessage(newMessage: Partial<Message>): Observable<string> {
    // Send post request to add a new user with the user data as the body.
    return this.httpClient.post<{id: string}>(this.messageUrl, newMessage).pipe(map(res => res.id));
  }
}
