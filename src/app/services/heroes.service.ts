import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Heroe } from '../models/heroe';

// import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  heroesURL:string = "https://heroesapp-mjrs.firebaseio.com/heroes.json";
  constructor(private httpClient:HttpClient) { 

  }

  addNuevoHeroe(heroe:Heroe){
    delete heroe.key$; // firebase no acepta que se le envie un atributo $key, aunque sea vacio
    const sHeroe:string = JSON.stringify(heroe);
    const headers = new HttpHeaders({ 'Content-Type':'application/json' });
    return this.httpClient.post(this.heroesURL,sHeroe,{headers});
  }

  getHeroes(){
    const headers = new HttpHeaders({ 'Content-Type':'application/json' });
    return this.httpClient.get(this.heroesURL,{headers});
  }


}