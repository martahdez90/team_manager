import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { MyTeamsComponent } from './pages/coach/my-teams/my-teams.component';
import { MyWorkoutsComponent } from './pages/coach/my-workouts/my-workouts.component';
import { MyExercisesComponent } from './pages/coach/my-exercises/my-exercises.component';
import { MySettingsComponent } from './pages/coach/my-settings/my-settings.component';
import { MyPlayersComponent } from './pages/coach/my-players/my-players.component';
import { MyCoachComponent } from './pages/player/my-coach/my-coach.component';
import { MyGamesComponent } from './pages/coach/my-games/my-games.component';
import { TrainingsPlayerComponent } from "./pages/player/trainings-player/trainings-player.component";
import { MatchesPlayerComponent } from "./pages/player/matches-player/matches-player.component";
import { PlayerSettingsComponent } from './pages/player/player-settings/player-settings.component';


const routes: Routes = [
  // landing
  {path: 'home', component: LandingPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  // coach
  {path: 'coach/myTeams', component: MyTeamsComponent},
  {path: 'coach/myPlayers', component: MyPlayersComponent},
  {path: 'coach/myWorkouts', component: MyWorkoutsComponent },
  {path: 'coach/myExercises', component: MyExercisesComponent},
  {path: 'coach/settings', component: MySettingsComponent},
  {path: 'coach/myGames', component: MyGamesComponent},
  // player
  {path: 'player/myTrainings', component: TrainingsPlayerComponent },
  {path: 'player/myMatches', component: MatchesPlayerComponent},
  {path: 'player/myCoach', component: MyCoachComponent},
  {path: 'player/settings', component: PlayerSettingsComponent},
  {path: '**',redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
