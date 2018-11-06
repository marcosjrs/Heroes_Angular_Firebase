import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { Heroe } from 'src/app/models/heroe';
import { map, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes:Heroe[];

  constructor(public heroesSvc:HeroesService) {    
    this.getHeroes();
  }

  getHeroes(){
    this.heroesSvc.getHeroes()
    .pipe(
      map(data => Object.keys(data).map(k =>{ 
        let h:Heroe = data[k];
        h.key$ = k;
        return h;
      }))
    )
    .subscribe( heroes => this.heroes = heroes); 
  }

  eliminar(heroe:Heroe){
    this.heroesSvc.eliminarHeroe(heroe).subscribe(
        resp => this.getHeroes(), 
        err => console.log(err)
      );
  }

  ngOnInit() {
  }

}
