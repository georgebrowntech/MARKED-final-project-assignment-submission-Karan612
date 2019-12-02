import { Game } from './../../shared/game';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'list-games',
  templateUrl: './list-games.component.html',
  styleUrls: ['./list-games.component.css']
})
export class ListGamesComponent implements OnInit {

  @Input() searchWord: String;
  searchForm: FormGroup;
  GameData: any = [];
  FilteredData: any = [];
  dataSource: MatTableDataSource<Game>;
  @ViewChild(MatPaginator, {static : false}) paginator: MatPaginator;
  displayedColumns: string[] = ['title', 'platform', 'genre','rating','publisher','release','status', 'action'];

  constructor(
    private gameApi: ApiService,
    public fb: FormBuilder) {
    this.gameApi.GetGames().subscribe(data => {
      this.GameData = data;
      this.dataSource = new MatTableDataSource<Game>(this.GameData);
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
      for(let i=0;i<this.GameData.length;i++){
        if(this.GameData[i]['title'].toUpperCase().startsWith(this.searchWord.toUpperCase())){
          this.FilteredData.push(this.GameData[i]);
          count++;
        }
      }
      if(this.FilteredData.length > 0){
        this.dataSource = new MatTableDataSource<Game>(this.FilteredData);
      }
    }
  }


  deleteGame(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.gameApi.DeleteGame(e._id).subscribe()
    }
  }

}
