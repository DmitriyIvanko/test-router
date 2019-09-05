import {
  Component,
  OnInit,
  Input,
  OnDestroy,
} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {
  Observable,
  Subscription,
} from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnDestroy, OnInit {

  @Input()
  public hero: Hero;

  public subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService,
  ) { }

  public ngOnInit(): void {
    this.subscription.add(this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.service.getHero(+params.get('id'));
      }),
    ).subscribe((hero) => {
      this.hero = hero;
    }));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  gotoHeroes(hero: Hero) {
    let heroId = hero ? hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
  }

}
