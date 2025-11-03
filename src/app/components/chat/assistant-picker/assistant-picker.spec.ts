import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantPicker } from './assistant-picker';

describe('AssistantPicker', () => {
  let component: AssistantPicker;
  let fixture: ComponentFixture<AssistantPicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistantPicker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistantPicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
