import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero'; //引入 hero.ts (step2)
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service'; //step 13

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  // step 6 : 
  styleUrls: ['./heroes.component.scss'] //(紫白)<--這個地址，是可以自由切換的。而且只影響到自己，不影響他人。
  //styleUrls: ['../app.component.scss'] //(黑白)<--我設定了兩者不同的 button onHover 顏色，可以看一下效果。
})
export class HeroesComponent implements OnInit {
  

  // step 11 (1)
  heroes: Hero[] = [];//一開始是空串列

  //constructor() { } // 原生，改為一進入就引進 HeroService 的實體
  constructor(private heroService: HeroService ,private messageService: MessageService) {} // step 11 (2) + step 13

  // step 11 (3) 在類別中，增加方法。
  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes(); //有 1, 2 才有 3
  // }

  // step 12 Observable
  getHeroes(): void {
  this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes); //當我收到回覆之後，才把值灌給屬性
  }

  ngOnInit(): void {
    // step 11 (4) 在這個類別 constructor 之後，就會做 ngOnInit ，呼叫那個方去。
    this.getHeroes(); // 有 3 才有 4
  }

  // step 14 routing 之後，省略了這個方法
  // selectedHero?: Hero; //設定有這個變數，但是不要為它賦值
  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;//等有人按下按鈕時，才賦值。
  // }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
