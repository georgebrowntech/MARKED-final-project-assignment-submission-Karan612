import { ApiService } from './../../shared/api.service';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {Router} from '@angular/router'

@Component({
  selector: 'admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList',{static : true}) chipList;
  @ViewChild('resetPlayerForm',{static : true}) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  adminForm: FormGroup;

  ngOnInit() {
    this.submitadminForm();
  }

  constructor(
    public fb: FormBuilder,
    private router:Router,
    private adminApi: ApiService,
    private ngZone: NgZone
    ) { 
  }

  submitadminForm() {
    this.adminForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.adminForm.controls[controlName].hasError(errorName);
  } 

  login() {
    if (this.adminForm.valid) {
      this.adminApi.Login(this.adminForm.value).subscribe(res => {
        if(res['status']){
        this.ngZone.run(() => this.router.navigateByUrl('/admin-home/1'));
        }
        else{
          alert('Invalid Credentials!');
        }
      });
    }
  }
}
