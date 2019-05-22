import { Component } from '@angular/core';
import { FirebaseDatabaseService } from './api/firebase-database.service';
import { Post } from './models/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Integração contínua com Angular e Firebase Hosting utilizando o Azure DevOps';

  dados:Array<Post>;

  constructor(private database: FirebaseDatabaseService){
    this.dados = new Array();
    this.loadDados(); // Carrega os dados iniciais
  }

  // Obtém os dados do firebase e armazena num array.
  private loadDados() {
    let self = this;
    this.database.getPosts().then(function(result:Array<Post>){
      self.dados = result;      
    });
  }
}