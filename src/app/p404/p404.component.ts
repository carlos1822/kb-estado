import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-p404',
  templateUrl: './p404.component.html',
  styleUrls: ['./p404.component.css'],
})
export class P404Component implements OnInit {
  private website = 'https://ehloqstarecup.blogspot.com/';

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      // window.location.href = this.website;
    }, 5000);
  }

  goOut() {
    window.location.href = this.website;
  }
}
