import { Player } from './../../shared/player';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'player-ranking',
  templateUrl: './player-ranking.component.html',
  styleUrls: ['./player-ranking.component.css']
})
export class PlayerRankingComponent implements OnInit {

  @Input() searchWord: String;
  searchForm: FormGroup;
  PlayerData: any = [];
  FilteredData: any = [];
  dataSource: MatTableDataSource<Player>;
  @ViewChild(MatPaginator, {static : false}) paginator: MatPaginator;
  displayedColumns: string[] = ['player', 'rank', 'score','time','favorite_game','status', 'action'];

  constructor(private playerApi: ApiService,
    public fb: FormBuilder
    ) {
    this.playerApi.GetPlayers().subscribe(data => {
      this.PlayerData = data;
      this.dataSource = new MatTableDataSource<Player>(this.PlayerData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
   }
  
  ngOnInit() {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  setSearchWord(e){
    this.FilteredData = [];
    this.searchWord = e.target.value;
    if(this.searchWord != null){
      let count = 0;
      for(let i=0;i<this.PlayerData.length;i++){
        if(this.PlayerData[i]['player'].toUpperCase().startsWith(this.searchWord.toUpperCase())){
          this.FilteredData.push(this.PlayerData[i]);
          count++;
        }
      }
      if(this.FilteredData.length > 0){
        this.dataSource = new MatTableDataSource<Player>(this.FilteredData);
      }
    }
  }

}
