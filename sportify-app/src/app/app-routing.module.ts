import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { MyTeamsComponent } from './pages/my-teams/my-teams.component';
import { MyWorkoutsComponent } from './pages/my-workouts/my-workouts.component';
import { MyExercisesComponent } from './pages/my-exercises/my-exercises.component';
import { MySettingsComponent } from './pages/my-settings/my-settings.component';
import { MyCalendarComponent } from './pages/my-calendar/my-calendar.component';
import { MyPlayersComponent } from './pages/my-players/my-players.component';
import { MyCoachComponent } from './pages/my-coach/my-coach.component';
import { MyGamesComponent } from './pages/my-games/my-games.component';


const routes: Routes = [
  // landing
  {path: 'home', component: LandingPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  // coach
  {path: 'coach/myTeams', component: MyTeamsComponent},
  {path: 'coach/myWorkouts', component: MyWorkoutsComponent },
  {path: 'coach/myExercises', component: MyExercisesComponent},
  {path: 'coach/settings', component: MySettingsComponent},
  {path: 'coach/myGames', component: MyGamesComponent},
  // player
  {path: 'player/myCalendar', component: MyCalendarComponent},
  {path: 'coach/myPlayers', component: MyPlayersComponent},
  {path: 'player/myCoach', component: MyCoachComponent},
  {path: 'player/settings', component: MySettingsComponent},
  {path: '**',redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
