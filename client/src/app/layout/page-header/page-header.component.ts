import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'c2s-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  //Todo: Add handler for it
  public showHeader: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

}
