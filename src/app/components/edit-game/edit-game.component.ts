import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit {

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
    this.updateBookForm();
  }



  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private gameApi: ApiService
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');
      this.gameApi.GetGame(id).subscribe(data => {
      this.gameForm = this.fb.group({
        title: [data.title, [Validators.required]],
        platform: [data.platform, [Validators.required]],
        genre: [data.genre, [Validators.required]],
        rating: [data.rating, [Validators.required]],
        publisher: [data.publisher, [Validators.required]],
        release: [data.release, [Validators.required]],
        status: [data.status, [Validators.required]]
      })      
    }) 
   }

     /* Reactive book form */
  updateBookForm() {
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

  updateGameForm() {
    var id = this.actRoute.snapshot.paramMap.get('id');
      this.gameApi.UpdateGame(id, this.gameForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/admin-home/1'))
      });
  }
}
