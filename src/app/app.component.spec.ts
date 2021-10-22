import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

const LIST_OF_SHELLS = [
  {value:'shell-one', disabled: false},
  {value:'shell-two', disabled: false},
  {value:'shell-three', disabled: false}
]



describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let htmlEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'shell-game'`, () => {
    expect(app.title).toEqual('shell-game');
  });

  it('should have three shells', () => {
    expect(app.listOfShells).toEqual(LIST_OF_SHELLS);
  });

  it('should call reavealBall function', () => {
    fixture.detectChanges();
    spyOn(app, 'revealBall').and.callThrough();
    htmlEl = fixture.debugElement.nativeElement.querySelector('shell');
    htmlEl.click;
    expect(app.revealBall).toHaveBeenCalled();
  })
});
