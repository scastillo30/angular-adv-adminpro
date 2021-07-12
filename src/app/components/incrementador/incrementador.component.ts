import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {
  
  ngOnInit() {
    this.btnClass = `btn ${ this.btnClass }`;
  }

  //puedo renombrar la variable 'progreso' a 'valor' si asi lo requiero o dejarlo en blanco para que siga
  //leyendo la variable progreso. -> @Input('valor') progreso: number = 30; 
  @Input('valor') progreso: number = 30; 
  @Input() btnClass: string = 'btn-primary';

  //Para emitir uso el decorador Output, es una funcion que el componente padre va a poder ejecutar.
  //En este caso para incrementar o decrementar los valores del progreso
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  cambiarValor(valor: number) {

    if(this.progreso >= 100 && valor >= 0) {
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }

    if(this.progreso <= 0 && valor < 0) {
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }

    //return this.progreso = this.progreso + valor;
     return this.valorSalida.emit(this.progreso = this.progreso + valor);

  }

  onChange(nuevoValor: number){
    
    if( nuevoValor >= 100 ) {
      this.progreso = 100;
    } else if ( nuevoValor <= 0 ){
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }
   
    this.valorSalida.emit( this.progreso );

  }

}
