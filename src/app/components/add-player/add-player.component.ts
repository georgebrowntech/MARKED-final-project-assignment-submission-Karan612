import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {

  favorite_game: any = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList',{static : true}) chipList;
  @ViewChild('resetPlayerForm',{static : true}) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  playerForm: FormGroup;
  RankArray: any = [1,2,3,4,5,6,7,8,9,10];
  StatusArray: any = ['Available', 'Unavailable'];

  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private studentApi: ApiService,
    private gameApi: ApiService) {
      this.gameApi.GetGames().subscribe(data => {
        this.favorite_game = data;
      })
     }

     /* Reactive book form */
  submitBookForm() {
    this.playerForm = this.fb.group({
      player: ['', [Validators.required]],
      rank: ['', [Validators.required]],
      score: ['', [Validators.required]],
      time: ['', [Validators.required]],
      favorite_game: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });

  }

    /* Get errors */
    public handleError = (controlName: string, errorName: string) => {
      return this.playerForm.controls[controlName].hasError(errorName);
    }  
  
    /* Submit book */
    submitPlayerForm() {
      if (this.playerForm.valid) {
        this.studentApi.AddPlayer(this.playerForm.value).subscribe(res => {
          this.ngZone.run(() => this.router.navigateByUrl('/admin-home/0'))
        });
      }
    }

}
