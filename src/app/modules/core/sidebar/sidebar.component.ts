import { Component, HostBinding, OnInit, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  items: string[] = ['connections', 'queries', 'settings']

  collapsed = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar(){
    this.collapsed = !this.collapsed;
  }

}
