import { Component, OnInit } from '@angular/core';
import { Equipo } from '../../../../interfaces/equipo.interface';
import { MainService } from '../../../../services/main.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-equipo',
  standalone: false,
  templateUrl: './page-equipo.component.html',
})
export class PageEquipoComponent implements OnInit {
  public equipo!: Equipo;
  public uuid!: string;

  constructor(
    private mainService: MainService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      params => this.uuid = params['uuid']
    )

    this.mainService.getUnEquipo(this.uuid).subscribe(
      equipo => console.log(equipo)
    )
  }
}