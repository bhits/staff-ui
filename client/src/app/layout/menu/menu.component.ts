import {Component, OnInit} from "@angular/core";
import {MenuItem} from "../shared/menu-item.model";
import {MenuItems} from "../shared/menu-items.model";

@Component({
  selector: 'c2s-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public menuItems: MenuItem[];

  constructor() {
  }

  ngOnInit() {
    this.menuItems = MenuItems;
  }

  //Todo: Add the handler
  navigateTo(text: string, routerLink: string) {
    console.log(routerLink);
  }
}
