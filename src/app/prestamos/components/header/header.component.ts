import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isMobile: boolean = false;
  isHomePage: boolean = false;
  showSideBarMenu: boolean = false;
  innerWidth: number = window.innerWidth;

  constructor(private router: Router) {
    this.checkAll();
  }

  ngOnInit(): void {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = event.target.innerWidth;
    this.checkAll();
  }

  openMenu() {
    this.showSideBarMenu = !this.showSideBarMenu;
  }

  checkAll() {
    if (this.innerWidth < 576) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }

    if (this.router.url.indexOf('/prestamos/') !== -1) {
      this.isHomePage = false;
    } else {
      this.isHomePage = true;
    }
  }
}
