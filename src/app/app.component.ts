import { CdkDrag, CdkDragDrop, CdkDragStart, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ElementRef, ViewChild, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  @ViewChild('ballElement') ballElement: ElementRef
  public title = 'shell-game';
  private currentShell: HTMLElement;
  public listOfShells = [
    { value:'shell-one', disabled: false },
    { value:'shell-two', disabled: false },
    { value:'shell-three', disabled: false }
  ]
  
  public dropAreaData = [
    { value: 'ball',
      disabled: true
    }
  ]

  public dragPosition = {
    x: 0,
    y: 0
  };

  constructor(private renderer: Renderer2, 
              private el: ElementRef
            ) {}

  ngOnInit(): void {
  }

  getCoordinates(event: CdkDragStart) {
    this.currentShell = event.source.element.nativeElement;
  }


  dragShell(event: any) {
    // get the ball with shell
      // if the position of the box is the same as the ball
      // group the ball and the box
    // disable shells
    // shuffel shells
    // enable click

    let shellPosition = {
      x: this.currentShell.getBoundingClientRect().left,
      y: this.currentShell.getBoundingClientRect().top
    };
    let ballPosition = {
      x: this.ballElement.nativeElement.getBoundingClientRect().left,
      y: this.ballElement.nativeElement.getBoundingClientRect().top
    };

    if (ballPosition.x - shellPosition.x >= 1 && 
        ballPosition.x - shellPosition.x <= 40 ) {
          this.listOfShells.forEach(shell => {
          shell.disabled=true;
          });
    } else {
      console.log('busted');
    }
  }

}
