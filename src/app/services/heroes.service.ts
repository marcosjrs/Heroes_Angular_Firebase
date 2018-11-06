import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Heroe } from '../models/heroe';

// import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  heroesURL:string = "https://heroesapp-mjrs.firebaseio.com/heroes.json";
  heroeURL:string = "https://heroesapp-mjrs.firebaseio.com/heroes";
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

  eliminarHeroe(heroe:Heroe){
    const headers = new HttpHeaders({ 'Content-Type':'application/json' });
    return this.httpClient.delete(`${this.heroeURL}/${heroe.key$}.json`,{headers});
  }

  getHeroe(id:string){
    const headers = new HttpHeaders({ 'Content-Type':'application/json' });
    return this.httpClient.get(`${this.heroeURL}/${id}.json`,{headers});
  }

  actualizarHeroe(heroe:Heroe){
    // firebase no acepta que se le envie un atributo $key, porque va en la url
    const sHeroe:string = JSON.stringify({nombre: heroe.nombre, editorial:heroe.editorial, bio:heroe.bio});
    const headers = new HttpHeaders({ 'Content-Type':'application/json' });
    return this.httpClient.put(`${this.heroeURL}/${heroe.key$}.json`,sHeroe,{headers});
  }


}