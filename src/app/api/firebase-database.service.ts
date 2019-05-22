import { Injectable } from '@angular/core';
import { initializeApp } from "firebase";
import { Post } from "../models/post";

@Injectable({
  providedIn: 'root'
})
export class FirebaseDatabaseService {
  
  private static firebase: firebase.app.App;
  
  constructor() { 
    this.initializeFirebase();
  }

  public getPosts = () => new Promise<Array<Post>>((resolve)=>{
    let self = this;
    
    // Seleciona os posts ordenando pelo Id (você pode preferir ordenar pela data de postagem, por exemplo)
    var postsRef = FirebaseDatabaseService.firebase.database().ref('posts').orderByChild("id");

    postsRef.on('value', function(snapshot) {  
      if (snapshot && snapshot.hasChildren)
      {
        let arrPost: Array<Post> = new Array();
                       
        snapshot.forEach(function(childSnapshot) {
          let childData = childSnapshot.val() as Post; // Converte os dados para um tipo Post
          // obtém a chave de identificação do registro (não está sendo utilizada neste código).
          let key = childSnapshot.key;
                   
          childData.id = childData.id;
          childData.titulo = childData.titulo;
          childData.descricao = childData.descricao;
  
          // Adiciona os dados mais recentes primeiro.
          // Caso deseja exibir os mais antigos primeiro, deve-se alterar "unshift" para "push"
          arrPost.unshift(childData);
        });

        resolve(arrPost);
      }
    });
  });

  private initializeFirebase()
  {
      if (FirebaseDatabaseService.firebase != null) return;

      let config = {
        apiKey: "AIzaSyC7HSvcOLJ20noTgtvTDr7CBS2OFhU6g4E",
        authDomain: "infinitescrolltest.firebaseapp.com",
        databaseURL: "https://infinitescrolltest.firebaseio.com"
      };
      
      FirebaseDatabaseService.firebase = initializeApp(config);
  }
}