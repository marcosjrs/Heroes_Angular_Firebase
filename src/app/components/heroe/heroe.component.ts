import { Component, OnInit } from '@angular/core';
import { Heroe } from 'src/app/models/heroe';
import { HeroesService } from 'src/app/services/heroes.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent {

  heroe:Heroe;
  idHeroe:String;
  actualizando:boolean;

  constructor(public heroesSvc:HeroesService, public route:ActivatedRoute) { 

    route.params.subscribe(
      params => {
        if( params.id && params.id != "nuevo"){
          this.actualizando = true;
          this.heroesSvc.getHeroe(params.id).subscribe(
            heroe=>{      
              heroe["key$"] = params.id;       
              this.inicializarHeroe(heroe);
            }
          );
        }else{
          this.inicializarHeroe();
        }
      }
    );
    
  }
  
  inicializarHeroe(heroe = null){    
    if(heroe){
      this.actualizando = true;
      this.heroe = heroe;
    }else{
      this.heroe = new Heroe("","Marvel","");
    }
  }

  guardar(){
    if(this.actualizando){
      this.heroesSvc.actualizarHeroe(this.heroe).subscribe( item => console.log(item) );
    }else{
      this.heroesSvc.addNuevoHeroe(this.heroe).subscribe( item => console.log(item) );
    }
  }
  
  reset(formulario:NgForm){
    this.inicializarHeroe();
    formulario.reset(this.heroe);
  }

}
