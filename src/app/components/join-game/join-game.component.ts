import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit {

  games: any = [];
  playerData: any = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList',{static : true}) chipList;
  @ViewChild('resetPlayerForm',{static : true}) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  joinForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private playerApi: ApiService,
    private gameApi: ApiService
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.playerApi.GetPlayer(id).subscribe(data => {
      this.playerData=data;
      this.joinForm = this.fb.group({
        player: [data.player],
        rank: [data.rank],
        score: [data.score],
        time: [data.time],
        favorite_game: [data.favorite_game],
        game: ['',[Validators.required]]
      })
      this.joinForm.controls['player'].disable(); 
      this.joinForm.controls['rank'].disable();  
      this.joinForm.controls['score'].disable();  
      this.joinForm.controls['time'].disable();  
      this.joinForm.controls['favorite_game'].disable();
    })
    this.gameApi.GetGames().subscribe(data => {
      this.games = data;
    })
   }

  ngOnInit() {
    this.updateBookForm();
  }

  /* Reactive book form */
  updateBookForm() {
    this.joinForm = this.fb.group({
      player: [''],
      rank: [''],
      score: [''],
      time: [''],
      favorite_game: [''],
      game: ['',[Validators.required]]
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.joinForm.controls[controlName].hasError(errorName);
  }

  /* Change status */
  updateJoinForm() {
    this.playerData['status'] = 'Unavailable';
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to join?')) {
      this.playerApi.UpdatePlayer(id, this.playerData).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/guest-home'))
      });
    }
  }

}
