import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { EditPlayerComponent } from './components/edit-player/edit-player.component';
import { JoinGameComponent } from './components/join-game/join-game.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { ListGamesComponent } from './components/list-games/list-games.component';
import { GuestHomeComponent } from './components/guest-home/guest-home.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { AddGameComponent } from './components/add-game/add-game.component';
import { EditGameComponent } from './components/edit-game/edit-game.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'guest-home'},
  { path: 'guest-home', component: GuestHomeComponent },
  { path: 'add-player', component: AddPlayerComponent },
  { path: 'edit-player/:id', component: EditPlayerComponent },
  { path: 'join-game/:id', component: JoinGameComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-home/:id', component: AdminHomeComponent },
  { path: 'add-game', component: AddGameComponent },
  { path: 'edit-game/:id', component: EditGameComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingModule { }
