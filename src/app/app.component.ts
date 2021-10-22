import { CdkDrag, CdkDragDrop, CdkDragStart } from '@angular/cdk/drag-drop';
import { QueryList } from '@angular/core';
import { Component, OnInit, ElementRef, ViewChild, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit{
  @ViewChild('ballElement') ballElement: ElementRef
  public title = 'shell-game';
  public hideBall = false;
  public disableButton = true;
  public buttonText = 'Play!';
  private played = false;
  private randomShell = 0;
  private shellElements: HTMLElement[];
  private currentShell: HTMLElement;
  private currentShellPosition = {
    x: 0,
    y: 0
  };
  private ballPosition = {
    x: 0,
    y: 0
  };
  public listOfShells = [
    { value:'shell-one', disabled: false },
    { value:'shell-two', disabled: false },
    { value:'shell-three', disabled: false }
  ]

  public dragPosition = {
    x: 0,
    y: 0
  };

  constructor(private renderer: Renderer2, 
              private el: ElementRef
            ) {}


  ngAfterViewInit(): void {
    this.shellElements = this.el.nativeElement.querySelectorAll('.shell');
  }

  ngOnInit(): void {
    this.randomShell = 0;
  }

  getCoordinates(event: CdkDragStart) {
    this.currentShell = event.source.element.nativeElement;
    this.currentShellPosition.x = this.currentShell.getBoundingClientRect().left;
    this.currentShellPosition.y = this.currentShell.getBoundingClientRect().top;
  }

  dragShell() {
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
          this.disableButton = false;
    } else {
      console.log('busted');
    }
  }

  animateShellUp() {
    this.renderer.addClass(this.currentShell, 'down-up');
  }

  shuffelShell(shell: HTMLElement, index: string) {
    this.renderer.addClass(shell, `shuffel-${index}`);
  }

  undoShuffelShells(shell: HTMLElement, index: string) {
    this.renderer.removeClass(shell, `shuffel-${index}`);
    this.renderer.setStyle(shell, 'top', '0')
    this.renderer.setStyle(shell, 'left', '0')
  }

  changeBallColor(color: string) {
    this.renderer.setStyle(this.ballElement.nativeElement, 'background-color', color);
  }

  play() {
    this.played = true;
    this.disableButton = true;
    this.listOfShells.forEach(shell => {
      shell.disabled=true;
    });
    this.changeBallColor('transparent');
    this.animateShellUp();

    this.currentShell.addEventListener('animationend', () => {
      for (const [index, shell] of Object.entries(this.shellElements)) {
         this.shuffelShell(shell, index);
      }
    });

    this.shellElements[2].addEventListener('animationend', () => {
      for (const [index, shell] of Object.entries(this.shellElements)) {
        this.undoShuffelShells(shell, index)
      }

      this.listOfShells.forEach(shell => {
        shell.disabled=false;
      });

        this.randomShell = Math.floor(Math.random() * 3);
        let shell = this.shellElements[this.randomShell];

        this.currentShellPosition = {
          x: shell.offsetLeft,
          y: shell.offsetTop
        }

        let newBallPositionTop = this.shellElements[this.randomShell].offsetTop;
        let newBallPositionLeft = this.shellElements[this.randomShell].offsetLeft;

        this.ballPosition = {
          x: newBallPositionLeft,
          y: newBallPositionTop
        }

        this.changeBallColor('#F2BA52');

        this.renderer.setStyle(this.ballElement.nativeElement, 'top', `-${newBallPositionTop}px`);
        this.renderer.setStyle(this.ballElement.nativeElement, 'left', `${newBallPositionLeft}px`);
    })
  }

  revealBall(event: any) {
    if (this.played) {
      this.disableButton = true;
      this.currentShell = event.path[0];

      if (this.ballPosition.x == 30 && 
          this.randomShell == 0 && 
          this.currentShell.classList.contains('shell-0')
          ) {
            this.renderer.addClass(this.ballElement.nativeElement, 'bounce');
            this.renderer.setStyle(this.ballElement.nativeElement, 'z-index', '1');
      } else if (this.ballPosition.x == 180 && 
                 this.randomShell == 1 && 
                 this.currentShell.classList.contains('shell-1')
                 ) {
              this.renderer.addClass(this.ballElement.nativeElement, 'bounce');
              this.renderer.setStyle(this.ballElement.nativeElement, 'z-index', '1');
      } else if (this.ballPosition.y == 330 && 
                 this.randomShell == 2 && 
                 this.currentShell.classList.contains('shell-2')) {
            this.renderer.addClass(this.ballElement.nativeElement, 'bounce');
            this.renderer.setStyle(this.ballElement.nativeElement, 'z-index', '1');
      } else {
        this.renderer.addClass(this.currentShell, 'shake');
      }
    }
  
  }

}
