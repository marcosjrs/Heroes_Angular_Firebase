import { Component, OnInit } from '@angular/core';
import { Heroe } from 'src/app/models/heroe';
import { HeroesService } from 'src/app/services/heroes.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe:Heroe;

  constructor(public heroesSvc:HeroesService) { 
    this.inicializarHeroe();
  }

  ngOnInit() {
  }
  
  inicializarHeroe(){
    this.heroe = new Heroe("","Marvel","");
  }

  guardar(){
    this.heroesSvc.addNuevoHeroe(this.heroe).subscribe( item => console.log(item) );
  }
  
  reset(formulario:NgForm){
    this.inicializarHeroe();
    formulario.reset(this.heroe);
  }

}
