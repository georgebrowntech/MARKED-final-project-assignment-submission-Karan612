import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList',{static : true}) chipList;
  @ViewChild('resetPlayerForm',{static : true}) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  gameForm: FormGroup;
  StatusArray: any = ['Active', 'Inactive'];

  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private gameApi: ApiService
  ) { }

     /* Reactive book form */
  submitBookForm() {
    this.gameForm = this.fb.group({
      title: ['', [Validators.required]],
      platform: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      rating: ['', [Validators.required]],
      publisher: ['', [Validators.required]],
      release: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
  }

   /* Get errors */
   public handleError = (controlName: string, errorName: string) => {
    return this.gameForm.controls[controlName].hasError(errorName);
  }  

  /* Submit book */
  submitGameForm() {
    if (this.gameForm.valid) {
      this.gameApi.AddGame(this.gameForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/admin-home/1'))
      });
    }
  }
}
