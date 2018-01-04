import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import "rxjs/add/operator/filter";
import "rxjs/add/operator/pairwise";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private _pageName: string;

  public pageNameChanged: EventEmitter<string>;

  @Input() get pageName(): string {
    return this._pageName;
  }

  set pageName(value: string) {
    this._pageName = value;
    this.router.navigateByUrl("/" + value);
    this.pageNameChanged.emit(value);
  }

  @Input() title: string;

  constructor(private router: Router, private activedRoute: ActivatedRoute) {
    this.pageNameChanged = new EventEmitter<string>();
  }

  ngOnInit() {
    this.router.events.filter(event => event instanceof NavigationEnd).pairwise()
      .subscribe((value: [NavigationEnd, NavigationEnd]) => {
        var previousPage = value[0].url.replace("/", "");
        var currentPage = value[0].url.replace("/", "");
        if(previousPage == "" && currentPage != "")
          this.pageName = currentPage;
      });
  }

}