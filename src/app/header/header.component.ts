import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import "rxjs/add/operator/filter";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private pageName: string;

  public navigateTo(pageName: string) {
    this.pageName = pageName;
    this.router.navigateByUrl("/" + pageName);
  }

  @Input() title: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.filter(event => event instanceof NavigationEnd)
      .subscribe((value: NavigationEnd) => {
        var currentPageName = value.urlAfterRedirects.replace("/", "");
        if(currentPageName !== "") this.navigateTo(currentPageName);
      });
  }

}