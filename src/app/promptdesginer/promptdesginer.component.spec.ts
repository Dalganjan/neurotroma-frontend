import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptdesginerComponent } from './promptdesginer.component';

describe('PromptdesginerComponent', () => {
  let component: PromptdesginerComponent;
  let fixture: ComponentFixture<PromptdesginerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromptdesginerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromptdesginerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
