import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { title } from 'process';

@Component({
  selector: 'app-flip-book',
  templateUrl: './flip-book.component.html',
  styleUrls: ['./flip-book.component.css']
})
export class FlipBookComponent implements OnInit {

  @Input() productsData = {};
  path = 'assets/img/default.jpg';

  constructor(private router: Router) { }

  ngOnInit(): void { }

  showDetails(id: string) {
    this.router.navigate(['detalles/', id]);
  }

}
