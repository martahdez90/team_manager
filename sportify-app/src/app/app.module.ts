import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CoachMenuComponent } from './pages/coach-menu/coach-menu.component';
import { PlayerMenuComponent } from './pages/player-menu/player-menu.component';
import { MyCalendarComponent } from './pages/my-calendar/my-calendar.component';
import { MyTeamsComponent } from './pages/my-teams/my-teams.component';
import { MyPlayersComponent } from './pages/my-players/my-players.component';
import { MyWorkoutsComponent } from './pages/my-workouts/my-workouts.component';
import { MyExercisesComponent } from './pages/my-exercises/my-exercises.component';
import { MyCoachComponent } from './pages/my-coach/my-coach.component';
import { MySettingsComponent } from './pages/my-settings/my-settings.component';
import { WhiteFooterComponent } from './pages/white-footer/white-footer.component';
import { GreenFooterComponent } from './pages/green-footer/green-footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ToolbarComponent } from './pages/toolbar/toolbar.component';
import { MyGamesComponent } from './pages/my-games/my-games.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from "@angular/common/http";
import { TrainingsPlayerComponent } from './pages/trainings-player/trainings-player.component';
import { MatchesPlayerComponent } from './pages/matches-player/matches-player.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    RegisterComponent,
    CoachMenuComponent,
    PlayerMenuComponent,
    MyCalendarComponent,
    MyTeamsComponent,
    MyPlayersComponent,
    MyWorkoutsComponent,
    MyExercisesComponent,
    MyCoachComponent,
    MySettingsComponent,
    WhiteFooterComponent,
    GreenFooterComponent,
    ToolbarComponent,
    MyGamesComponent,
    TrainingsPlayerComponent,
    MatchesPlayerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 

}

