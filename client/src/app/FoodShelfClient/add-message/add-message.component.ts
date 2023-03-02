import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessageService } from '../../FoodShelfClient/foodshelfclient.service';


@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.scss']
})
export class AddMessageComponent {

  addMessageForm = new FormGroup({
    // We allow alphanumeric input and limit the length for name.
    name: new FormControl('', Validators.compose([
      Validators.minLength(2),
      // In the real world you'd want to be very careful about having
      // an upper limit like this because people can sometimes have
      // very long names. This demonstrates that it's possible, though,
      // to have maximum length limits.
      Validators.maxLength(50),
      (fc) => {
        if (fc.value.toLowerCase() === 'abc123' || fc.value.toLowerCase() === '123abc') {
          return ({existingName: true});
        } else {
          return null;
        }
      },
    ])),

    // Since this is for a company, we need workers to be old enough to work, and probably not older than 200.
    body: new FormControl('',Validators.compose([
      Validators.required,
      Validators.minLength(10),
      Validators.max(500),
      // In the HTML, we set type="number" on this field. That guarantees that the value of this field is numeric,
      // but not that it's a whole number. (The user could still type -27.3232, for example.) So, we also need
      // to include this pattern.
    ])),

  });

  readonly addMessageValidationMessages = {
    name: [
      {type: 'required', message: 'Name is required'},
      {type: 'minlength', message: 'Name must be at least 2 characters long'},
      {type: 'maxlength', message: 'Name cannot be more than 50 characters long'},
    ],

    body: [
      {type: 'required', message: 'Message body is required'},
      {type: 'minlength', message: 'Message must be at least 10 characters long'},
      {type: 'maxlength', message: 'Message cannot be more than 500 characters long'}
    ],

  };

  constructor(private messageService: MessageService, private snackBar: MatSnackBar, private router: Router) {
  }


  formControlHasError(controlName: string): boolean {
    return this.addMessageForm.get(controlName).invalid &&
      (this.addMessageForm.get(controlName).dirty || this.addMessageForm.get(controlName).touched);
  }

  getErrorMessage(name: keyof typeof this.addMessageValidationMessages): string {
    for(const {type, message} of this.addMessageValidationMessages[name]) {
      if (this.addMessageForm.get(name).hasError(type)) {
        return message;
      }
    }
    return 'Unknown error';
  }

  submitForm() {
    this.messageService.addMessage(this.addMessageForm.value).subscribe({
      next: (newId) => {
        this.snackBar.open(
          `Added message ${this.addMessageForm.value.name}`,
          null,
          { duration: 2000 }
        );
        this.router.navigate(['/foodshelfclient/']);
      },
      error: err => {
        this.snackBar.open(
          `Problem contacting the server – Error Code: ${err.status}\nMessage: ${err.message}`,
          'OK',
          { duration: 5000 }
        );
      },
       complete: () => console.log('Add user completes!')
    });
  }

}
