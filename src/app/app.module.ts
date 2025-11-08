import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ContentCardComponent } from './components/content-card/content-card.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    VideoPlayerComponent,
    ContentCardComponent
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
/**
 * Root Angular module for the SmartTV OTT application.
 *
 * @remarks
 * Declares and bootstraps the primary application components and imports browser support.
 */
export class AppModule { }
