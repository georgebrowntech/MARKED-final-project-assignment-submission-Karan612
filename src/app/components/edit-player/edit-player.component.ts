import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit {

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
  
  constructor( 
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private playerApi: ApiService,
    private gameApi: ApiService)
     {
      this.gameApi.GetGames().subscribe(data => {
        this.favorite_game = data;
      })
     
      var id = this.actRoute.snapshot.paramMap.get('id');
      this.playerApi.GetPlayer(id).subscribe(data => {
      this.playerForm = this.fb.group({
        player: [data.player, [Validators.required]],
        rank: [data.rank, [Validators.required]],
        score: [data.score, [Validators.required]],
        time: [data.time, [Validators.required]],
        favorite_game: [data.favorite_game, [Validators.required]],
        status: [data.status, [Validators.required]]
      })      
    })    
     }

  ngOnInit() {
    this.updateBookForm();
  }

  /* Reactive book form */
  updateBookForm() {
    this.playerForm = this.fb.group({
      player: ['', [Validators.required]],
      rank: ['', [Validators.required]],
      score: ['', [Validators.required]],
      time: ['', [Validators.required]],
      favorite_game: ['', [Validators.required]],
      status: ['', [Validators.required]],
    })
  }
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.playerForm.controls[controlName].hasError(errorName);
  }

  updatePlayerForm() {
    var id = this.actRoute.snapshot.paramMap.get('id');
      this.playerApi.UpdatePlayer(id, this.playerForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/admin-home/0'))
      });
  }

}

