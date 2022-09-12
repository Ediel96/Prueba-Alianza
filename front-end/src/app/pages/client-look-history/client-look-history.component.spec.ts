import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientLookHistoryComponent } from './client-look-history.component';

describe('ClientLookHistoryComponent', () => {
  let component: ClientLookHistoryComponent;
  let fixture: ComponentFixture<ClientLookHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientLookHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientLookHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
