import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailProductPage } from './detail-product.page';

describe('DetailProductPage', () => {
  let component: DetailProductPage;
  let fixture: ComponentFixture<DetailProductPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
