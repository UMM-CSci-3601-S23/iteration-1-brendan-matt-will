import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodShelfClientListComponent } from './food-shelf-client-list.component';

describe('FoodShelfClientListComponent', () => {
  let component: FoodShelfClientListComponent;
  let fixture: ComponentFixture<FoodShelfClientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodShelfClientListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodShelfClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
