import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyProductDialogComponent } from './buy-product-dialog.component';

describe('BuyProductDialogComponent', () => {
  let component: BuyProductDialogComponent;
  let fixture: ComponentFixture<BuyProductDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyProductDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
