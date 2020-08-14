import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CoachMenuComponent } from './pages/coach-menu/coach-menu.component';
import { PlayerMenuComponent } from './pages/player-menu/player-menu.component';
import { MyTeamsComponent } from './pages/my-teams/my-teams.component';
import { MyPlayersComponent } from './pages/my-players/my-players.component';
import { MyWorkoutsComponent } from './pages/my-workouts/my-workouts.component';
import { MyExercisesComponent } from './pages/my-exercises/my-exercises.component';
import { MyCoachComponent } from './pages/my-coach/my-coach.component';
import { MySettingsComponent } from './pages/my-settings/my-settings.component';
import { GreenFooterComponent } from './pages/green-footer/green-footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { MyGamesComponent } from './pages/my-games/my-games.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from "@angular/common/http";
import { TrainingsPlayerComponent } from './pages/trainings-player/trainings-player.component';
import { MatchesPlayerComponent } from './pages/matches-player/matches-player.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { LandingMenuComponent } from './pages/landing-menu/landing-menu.component';
import { PlayerSettingsComponent } from './pages/player-settings/player-settings.component';


//validadores npm i ng-validate-equal
import { ValidateEqualModule } from 'ng-validate-equal';
import { WhiteFooterComponent } from './pages/white-footer/white-footer.component';


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
    HomeComponent,
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

