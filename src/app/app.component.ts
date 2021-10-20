import { Component, OnInit, ElementRef, ViewChild, Renderer2, AfterViewInit } from '@angular/core';

interface MousePosition {
  x: number;
  y: number;
}; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit{
  @ViewChild('shellOne') shellOne: ElementRef;

  public title = 'shell-game';
  private dragOffset: number[] = [0, 0]; 
  private mouseDown: boolean = false;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log(this.shellOne);
  }

  getCoordinates(event: any) {
    this.dragOffset = [
      this.shellOne.nativeElement.offsetLeft - event.clientX,
      this.shellOne.nativeElement.offsetTop - event.clientY
    ];
  }

  endMove() {
    console.log('move ended');
  }

  dragShell(event: any) {
    event.preventDefault();
    let mousePos: MousePosition = {
      x : event.clientX,
      y : event.clientY
    }
    let left = `${mousePos.x + this.dragOffset[0]}px`;
    let top = `${mousePos.y + this.dragOffset[1]}px`;

    this.shellOne.nativeElement.style.left = left;
    this.shellOne.nativeElement.style.top = top;
  }

}
