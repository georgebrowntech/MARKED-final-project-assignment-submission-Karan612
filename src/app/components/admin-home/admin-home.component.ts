import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from './../../shared/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  tabid;
  constructor(
    private adminApi: ApiService,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute) { 
      var id = this.actRoute.snapshot.paramMap.get('id');
      if(id == '0' || id == '1'){
        this.tabid = id;
      }
      else{
        this.tabid = 0;
      }
    }

  ngOnInit() {
  }

  logout(){
    this.adminApi.Logout().subscribe(req => {
      this.ngZone.run(() => this.router.navigateByUrl('/guest-home'));
    });
  }

}
