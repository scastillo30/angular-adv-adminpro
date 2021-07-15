import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';

import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo: string | undefined;
  public tituloSubs$: Subscription;

  constructor( private router:Router, private route: ActivatedRoute ) {

    console.log( route.snapshot.data )

    this.tituloSubs$ = this.getArgumentosRuta()
    .subscribe( ({titulo}) => {
      this.titulo = titulo;
      document.title = `AdminPro - ${ titulo }`;
    });

  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

   getArgumentosRuta(){
     //Obtener el titulo
    return this.router.events
    .pipe(
      filter( ( event ): event is ActivationEnd => event instanceof ActivationEnd ),
      filter( ( event:ActivationEnd ) => event.snapshot.firstChild === null ),
      map( ( event:ActivationEnd ) => event.snapshot.data )
    )
   }

}
