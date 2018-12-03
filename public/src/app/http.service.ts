import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  abilities;
  self;
  name;

  constructor(private _http: HttpClient) {
    this.abilities = []
    this.name = ''
    this.self = this
    this.getPokemon(this.self)
   }

   findSimilarAbilities(self){
     

    for (var key in self.abilities){

      let sharedAbility = self._http.get(self.abilities[key].url)
      sharedAbility.subscribe(function(data){
        var count = 0
        for (var i = 0; i < data.pokemon.length; i++){
          if (data.pokemon[i].pokemon.name != self.name){
            count++
          }
        }
        console.log(count + " pokemon share the " +  data.name + " ability with " + self.name)
      })
    }

   }

   getPokemon(self){
     
     let bulbasaur = this._http.get('https://pokeapi.co/api/v2/pokemon/1/')
     bulbasaur.subscribe(function(data){

      self.name = data.name

       for (var i = 0 ; i < data.abilities.length; i++){
         self.abilities.push({name : data.abilities[i].ability.name, url : data.abilities[i].ability.url})
       }
       self.findSimilarAbilities(self)
       
     })
   }


}
