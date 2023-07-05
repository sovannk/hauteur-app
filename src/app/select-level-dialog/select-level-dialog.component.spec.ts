import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLevelDialogComponent } from './select-level-dialog.component';

describe('SelectLevelDialogComponent', () => {
  let component: SelectLevelDialogComponent;
  let fixture: ComponentFixture<SelectLevelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectLevelDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectLevelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
