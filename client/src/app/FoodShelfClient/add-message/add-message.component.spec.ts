import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, AbstractControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockMessageService } from 'src/testing/message.service.mock';
import { MessageService } from '../../FoodShelfClient/foodshelfclient.service';
import { AddMessageComponent } from './add-message.component';

describe('AddMessageComponent', () => {
  let addMessageComponent: AddMessageComponent;
  let addMessageForm: FormGroup;
  let fixture: ComponentFixture<AddMessageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.overrideProvider(MessageService, { useValue: new MockMessageService() });
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      declarations: [AddMessageComponent],
    }).compileComponents().catch(error => {
      expect(error).toBeNull();
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMessageComponent);
    addMessageComponent = fixture.componentInstance;
    fixture.detectChanges();
    addMessageForm = addMessageComponent.addMessageForm;
    expect(addMessageForm).toBeDefined();
    expect(addMessageForm.controls).toBeDefined();
  });

  // Not terribly important; if the component doesn't create
  // successfully that will probably blow up a lot of things.
  // Including it, though, does give us confidence that our
  // our component definitions don't have errors that would
  // prevent them from being successfully constructed.
  it('should create the component and form', () => {
    expect(addMessageComponent).toBeTruthy();
    expect(addMessageForm).toBeTruthy();
  });

  // Confirms that an initial, empty form is *not* valid, so
  // people can't submit an empty form.
  it('form should be invalid when empty', () => {
    expect(addMessageForm.valid).toBeFalsy();
  });

  describe('The name field', () => {
    let nameControl: AbstractControl;

    beforeEach(() => {
      nameControl = addMessageComponent.addMessageForm.controls.name;
    });

    it('should  allow empty names', () => {
      nameControl.setValue('');
      expect(nameControl.valid).toBeTruthy();
    });

    it('should be fine with "Chris Smith"', () => {
      nameControl.setValue('Chris Smith');
      expect(nameControl.valid).toBeTruthy();
    });

    it('should  fail on single character names', () => {
      nameControl.setValue('x');
      expect(nameControl.valid).toBeFalsy();
      // Annoyingly, Angular uses lowercase 'l' here
      // when it's an upper case 'L' in `Validators.minLength(2)`.
      expect(nameControl.hasError('minlength')).toBeTruthy();
    });


    it('should allow digits in the name', () => {
      nameControl.setValue('Bad2Th3B0ne');
      expect(nameControl.valid).toBeTruthy();
    });


  });

  describe('The body field', () => {
    let bodyControl: AbstractControl;

    beforeEach(() => {
      bodyControl = addMessageComponent.addMessageForm.controls.body;
    });

    it('should not allow empty body', () => {
      bodyControl.setValue('');
      expect(bodyControl.valid).toBeFalsy();
    });

    it('should fail on bodies that are too small', () => {
      bodyControl.setValue('ah');
      expect(bodyControl.valid).toBeFalsy();
    });


    it('should allow numbers in body', () => {
      bodyControl.setValue('I want 27 bagels right now');
      expect(bodyControl.valid).toBeTruthy();
      expect(bodyControl.hasError('min')).toBeFalsy();
    });

  });


});
