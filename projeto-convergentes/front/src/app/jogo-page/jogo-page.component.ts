import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { JogoService } from './jogo-service';
import { IJogo } from './IJogo';


@Component({
  selector: 'app-jogo-page',
  templateUrl: './jogo-page.component.html',
  styleUrls: ['./jogo-page.component.css']
})
export class JogoPageComponent implements OnInit {

  public errorMsg;
  public jogoList: IJogo[];


  constructor(private jogoService: JogoService) { }

  ngOnInit() {
    this.getRestItems();
  }

  // Read all REST Items
  getRestItems(): void {
    this.jogoService.getJogos()
    .subscribe(data => this.jogoList = data,
              error => this.errorMsg = error);
  }

  saveJogo() {
    const jogo: IJogo = {nome: 'Counter-Strike'};
    this.jogoService.postJogo(jogo).subscribe(res => {
         const jogo_: IJogo = res.body;
         console.log(jogo_.nome);
         console.log(res.headers.get('Content-Type'));
       },
 (err: HttpErrorResponse) => {
         if (err.error instanceof Error) {
           console.log('An error occurred:', err.error.message);
         } else {
           console.log('Backend returned status code: ', err.status);
           console.log('Response body:', err.error);
         }
       }
    );
  }
}
