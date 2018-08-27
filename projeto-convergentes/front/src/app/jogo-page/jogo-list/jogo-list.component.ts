import { Component, OnInit } from '@angular/core';
import { JogoService } from './../jogo-service';

@Component({
  selector: 'app-jogo-list',
  templateUrl: './jogo-list.component.html',
  styleUrls: ['./jogo-list.component.css']
})
export class JogoListComponent implements OnInit {


  public jogos = [];
  public errorMsg;

  constructor(private jogoService: JogoService) { }

  ngOnInit() {
    console.log('entrou em jogo list component');
    this.jogoService.getAmigos()
      .subscribe(data => this.jogos = data,
                error => this.errorMsg = error);

  }

}
