import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

//páginas
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

//otros
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

//Menus y footer
import { CoachMenuComponent } from './menus/coach-menu/coach-menu.component';
import { GreenFooterComponent } from './menus/green-footer/green-footer.component';
import { LandingMenuComponent } from './menus/landing-menu/landing-menu.component';
import { PlayerMenuComponent } from './menus/player-menu/player-menu.component';
import { WhiteFooterComponent } from './menus/white-footer/white-footer.component';

//Coach
import { MyGamesComponent } from './pages/coach/my-games/my-games.component';
import { MyWorkoutsComponent } from './pages/coach/my-workouts/my-workouts.component';
import { MyTeamsComponent } from './pages/coach/my-teams/my-teams.component';
import { MyExercisesComponent } from './pages/coach/my-exercises/my-exercises.component';
import { MyPlayersComponent } from './pages/coach/my-players/my-players.component';
import { MySettingsComponent } from './pages/coach/my-settings/my-settings.component';

//Player
import { PlayerSettingsComponent } from './pages/player/player-settings/player-settings.component';
import { TrainingsPlayerComponent } from './pages/player/trainings-player/trainings-player.component';
import { MyCoachComponent } from './pages/player/my-coach/my-coach.component';
import { MatchesPlayerComponent } from './pages/player/matches-player/matches-player.component';

//validadores npm i ng-validate-equal
import { ValidateEqualModule } from 'ng-validate-equal';


@NgModule({
  declarations: [
    AppComponent,
    WhiteFooterComponent,
    LandingPageComponent,
    LoginComponent,
    RegisterComponent,
    CoachMenuComponent,
    PlayerMenuComponent,
    MyTeamsComponent,
    MyPlayersComponent,
    MyWorkoutsComponent,
    MyExercisesComponent,
    MyCoachComponent,
    MySettingsComponent,
    GreenFooterComponent,
    MyGamesComponent,
    TrainingsPlayerComponent,
    MatchesPlayerComponent,
    LandingMenuComponent,
    PlayerSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ValidateEqualModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 

}

