import { Component, OnInit, Input} from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

  import { from } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  modalRef : any
  constructor(
    private modalService : NgbModal
  ) { }

  closeResult: string
  squares : any[]
  xIsNext : boolean
  winner : string
  count = 0;
  player1 : string
  player2 : string
  curr: string = ''
  currReverse: string = ''
  ngOnInit(){
    this.newGame();
}

//newGame starts
  newGame(){
     this.modalRef.close();
     this.squares = Array(9).fill(null)
     this.winner = null
     this.xIsNext = true
     this.count = 0
}

//toggle player as per moves
  get player (){
    this.curr = this.xIsNext ? this.player2 : this.player1
    this.currReverse = this.xIsNext ? this.player1 : this.player2
    console.log('next',this.xIsNext);
    console.log('curr',this.curr);
    return this.xIsNext ? 'MB' : 'EB';
  }


  //getting player from modal_form
  setPlayer(form: NgForm){

    this.player1 = form.value.player1
    this.player2 = form.value.player2
    // console.log(this.player2);
    this.curr = this.player1 //assigning initial current player
}

//move operation
  makeMove(id: number){
    if(!this.squares[id]){
      this.squares.splice(id, 1, this.player)
      this.xIsNext = !this.xIsNext
      this.count++
    }
    if(this.count==9)
      this.winner = "draw"
    else
    {
          this.winner = this.calculateWinner()
          if(this.winner=='MB')
           this.playAudio()
          if(this.winner=='EB')
          this.playAudio2()
    }

  }

  //calculating moves and results
  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
        this.count = 0;
      }
    }
    return null;
  }

  //modal functions
  //open modal
  open(content){
    this.modalRef = this.modalService.open(content);
    this.modalRef.result
    .then((result) => {
      this.closeResult = `Closed with: ${result}`
    },(reason) =>{
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
    });
  }

  //closing modal option
   private getDismissReason(reason: any) : string{
     if(reason === ModalDismissReasons.ESC) {
       return 'by pressing ESC';
     }
     else if(reason === ModalDismissReasons.BACKDROP_CLICK){
       return 'by clicking on a backdrop';
     }
     else{
       return `with: ${reason}`;

     }
   }

   playAudio(){
    let audio = new Audio();
    audio.src = "../assets/mb.mp3";
    audio.load();
    audio.play();
  }
  playAudio2(){
    let audio = new Audio();
    audio.src = "../assets/eb.mpeg";
    audio.load();
    audio.play();
  }
  // this.playAudio();

   //end
}
