import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {

  constructor() { }

  @Input() value: 'MB' | 'EB';
  @Input() win :string

  ngOnInit(){
    // console.log(this.win);
  }
}
