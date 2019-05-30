import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: `
    <div class="jumbotron text-xs-center">
        <h1 class="display-3">Thank You!</h1>
        <p class="lead" [innerHTML]=content>
        </p>
        <hr>
        <p>
            Having trouble? <a href="">Contact us</a>
        </p>
        <p class="lead">
            <a class="btn btn-primary btn-sm" routerLink="/" role="button">Continue to homepage</a>
        </p>
    </div>
  `
})

export class ThankyouComponent implements OnInit {

  content: string;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {

    let type = this.activatedRoute.snapshot.paramMap.get('type')

    if(type == "1") {
      this.content = "<strong>Your shipment list has deliver successfully</strong> Thanks for complete this action."
    } else if(type == "2") {
      this.content = "<strong>Su reporte diario ha sido enviado con &eacute;xito.</strong> Gracias."
    }
  }

}
