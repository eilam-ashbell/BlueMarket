import { Component, OnInit } from '@angular/core';
import { authStore } from 'src/app/redux/auth-state';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
    
    public role = authStore.getState().user.role.role;

  constructor() { }

  ngOnInit(): void {
  }

}
