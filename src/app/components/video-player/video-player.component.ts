import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { IContent } from '../../models/content.model';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
/**
 * Video player component that provides playback controls and handles video element interactions.
 * 
 * @remarks
 * This component manages video playback state, buffering, volume control, and time tracking.
 * It provides keyboard event handling for player controls and emits events for component lifecycle.
 * 
 * @example
 * ```html
 * <app-video-player 
 *   [content]="videoContent" 
 *   (onClose)="handlePlayerClose()">
 * </app-video-player>
 * ```
 * 
 * @public
 */
export class VideoPlayerComponent {

  /**
   * The content item to be played in the video player.
   * Contains metadata and information about the video content such as title, description, URL, etc.
   * @default null
   */
  @Input() content: IContent | null = null;

  /**
   * Event emitted when the video player is closed.
   * @event
   */
  @Output() onClose = new EventEmitter<void>();

  /**
   * Reference to the HTML video element in the component's template.
   * 
   * @remarks
   * This property is populated after the view is initialized and provides direct access
   * to the native HTMLVideoElement for playback control and manipulation.
   * 
   * @defaultValue null - The value is null until the view is initialized
   */
  @ViewChild('videoElement') videoElement: ElementRef<HTMLVideoElement> | null = null;

  /**
   * Whether the video is currently playing.
   * @type {boolean}
   * @default false
   */
  isPlaying = false;

  /**
   * Whether the player controls are visible. Controls are auto-hidden after inactivity.
   * @type {boolean}
   * @default true
   */
  showControls = true;

  /**
   * Current playback time in seconds (read from the native video element).
   * @type {number}
   * @default 0
   */
  currentTime = 0;

  /**
   * Duration of the currently loaded video in seconds.
   * @type {number}
   * @default 0
   */
  duration = 0;

  /**
   * Percentage (0-100) of the video that has been buffered.
   * Calculated from the video's buffered ranges and duration.
   * @type {number}
   * @default 0
   */
  bufferedPercentage = 0;

  /**
   * Current audio volume (0.0 - 1.0).
   * @type {number}
   * @default 1
   */
  volume = 1;

  /**
   * Indicates whether the video element is currently buffering.
   * This is set based on native video events like 'waiting' and 'canplay'.
   * @type {boolean}
   * @default false
   */
  isBuffering = false;

  /**
   * Stores error information if video fails to load or play.
   * @type {string | null}
   * @default null
   */
  videoError: string | null = null;

  /**
   * Timeout handle used to auto-hide controls after inactivity.
   * Implementation detail: may be a number or NodeJS.Timer depending on environment.
   */
  controlsTimeout: any;

  /**
   * Angular lifecycle hook that is called after the component's view has been fully initialized.
   * Sets up the native video element and its event listeners once the view and DOM are available.
   * 
   * @remarks
   * This hook ensures that the video element exists in the DOM before attempting to attach listeners.
   * 
   * @returns {void}
   */
  ngAfterViewInit(): void {
    // Initialize native video element listeners after the view is available.
    this.setupVideoElement();
  }

  /**
   * Sets up event listeners for the video element to handle playback events.
   * 
   * This method attaches various event listeners to the native video element to track
   * and respond to playback state changes, including play, pause, time updates, metadata
   * loading, buffering states, and playback readiness.
   * 
   * @remarks
   * The method will exit early if the video element reference is not available.
   * 
   * Event listeners attached:
   * - `play`: Triggered when video playback starts
   * - `pause`: Triggered when video playback is paused
   * - `timeupdate`: Triggered periodically during video playback to track current time
   * - `loadedmetadata`: Triggered when video metadata (duration, dimensions) is loaded
   * - `waiting`: Triggered when playback stops due to buffering
   * - `canplay`: Triggered when enough data is buffered to resume playback
   * 
   * @returns {void}
   */
  setupVideoElement(): void {
    if (!this.videoElement) return;
    const video = this.videoElement.nativeElement;
    video.addEventListener('play', () => this.onPlay());
    video.addEventListener('pause', () => this.onPause());
    video.addEventListener('timeupdate', () => this.onTimeUpdate());
    video.addEventListener('loadedmetadata', () => this.onLoadedMetadata());
    video.addEventListener('waiting', () => this.isBuffering = true);
    video.addEventListener('canplay', () => this.isBuffering = false);

    //Añadir manejador de eventos de error para fallos de carga de vídeo
    video.addEventListener('error', (event) => this.onVideoError(event));

    // TODO: Implementar seguimiento de progreso para analítica
  }

  /**
   * Handler invoked when a video loading or playback error occurs.
   * Logs diagnostic information and updates UI state with a user-friendly message.
   * 
   * @param event Event object from the 'error' event
   * @remarks
   * This method decodes the `MediaError` code (if available) and stores a readable message
   * in `videoError`. It can be used by the template to show a visual error notice.
   */
  onVideoError(event: Event): void {
    const video = event.target as HTMLVideoElement;
    const error = video.error;
    if (!error) {
      this.videoError = 'Error desconocido al reproducir el vídeo.';
      console.error('Unknown video error event:', event);
      return;
    }

    switch (error.code) {
      case MediaError.MEDIA_ERR_ABORTED:
        this.videoError = 'La reproducción del vídeo fue cancelada por el usuario.';
        break;
      case MediaError.MEDIA_ERR_NETWORK:
        this.videoError = 'Error de red al cargar el vídeo.';
        break;
      case MediaError.MEDIA_ERR_DECODE:
        this.videoError = 'El vídeo no se pudo decodificar correctamente.';
        break;
      case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
        this.videoError = 'El formato o la fuente del vídeo no son compatibles.';
        break;
      default:
        this.videoError = 'Error desconocido al reproducir el vídeo.';
    }

    console.error('Video playback error:', error, this.videoError);
    this.isPlaying = false;
    this.isBuffering = false;
  }

  /**
   * Handler invoked when the native video dispatches a 'play' event.
   * Updates component playback state.
   */
  onPlay(): void {
    this.isPlaying = true;
    this.videoError = null; // Limpia errores si se vuelve a reproducir correctamente
  }

  /**
   * Handler invoked when the native video dispatches a 'pause' event.
   * Updates component playback state and ensures controls are visible.
   */
  onPause(): void {
    this.isPlaying = false;
    this.showControls = true;
  }

  /**
   * Handler for the native 'timeupdate' event. Reads currentTime from the video
   * element and updates the buffered percentage for UI display.
   */
  onTimeUpdate(): void {
    if (this.videoElement) {
      this.currentTime = this.videoElement.nativeElement.currentTime;
      this.updateBufferedPercentage();
    }
  }

  /**
   * Handler for the native 'loadedmetadata' event. Reads and stores video duration.
   */
  onLoadedMetadata(): void {
    if (this.videoElement) {
      this.duration = this.videoElement.nativeElement.duration;
    }
  }

  /**
   * Recomputes the buffered percentage of the video based on the last buffered range.
   * Sets {@link bufferedPercentage} to a number between 0 and 100.
   */
  updateBufferedPercentage(): void {
    if (!this.videoElement || !this.duration) return;
    const video = this.videoElement.nativeElement;
    if (video.buffered.length > 0) {
      this.bufferedPercentage = (video.buffered.end(video.buffered.length - 1) / this.duration) * 100;
    }
  }

  /**
   * Toggles playback: plays the video if paused, pauses if playing.
   * Safe to call even if the native video element is not yet present.
   */
  togglePlayPause(): void {
    if (!this.videoElement) return;
    if (this.isPlaying) {
      this.videoElement.nativeElement.pause();
    } else {
      this.videoElement.nativeElement.play();
    }
  }

  /**
   * Seeks the video forward or backward by a number of seconds.
   * @param seconds Number of seconds to seek (+ forward, - backward).
   */
  seek(seconds: number): void {
    if (this.videoElement) {
      const newTime = Math.max(0, Math.min(this.currentTime + seconds, this.duration));
      this.videoElement.nativeElement.currentTime = newTime;
    }
  }

  /**
   * Adjusts the player volume by a delta in the range [-1, 1].
   * Volume is clamped between 0.0 and 1.0.
   * @param delta Amount to change the volume by (positive to increase).
   */
  changeVolume(delta: number): void {
    this.volume = Math.max(0, Math.min(this.volume + delta, 1));
    if (this.videoElement) {
      this.videoElement.nativeElement.volume = this.volume;
    }
  }

  /**
   * Formats a time value in seconds to a human-readable string `M:SS`.
   * Returns '0:00' for falsy or zero values.
   * @param seconds Time in seconds
   * @returns Formatted time string
   */
  formatTime(seconds: number): string {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins + ':' + (secs < 10 ? '0' : '') + secs;
  }

  /**
   * Emits the `onClose` event to notify parent components to close the player.
   */
  close(): void {
    this.onClose.emit();
  }

  @HostListener('keydown', ['$event'])
  /**
   * Global keyboard handler for the component. Intended to support remote control
   * and keyboard shortcuts while the player is focused.
   *
   * Expected mappings (not implemented):
   * - Space: toggle play/pause
   * - ArrowLeft / ArrowRight: seek backward/forward
   * - ArrowUp / ArrowDown: increase/decrease volume
   * - Esc: exit player
   *
   * @param event Keyboard event captured via HostListener
   */
  handleKeyboardEvent(event: KeyboardEvent): void {
    // atajos de teclado y control remoto:
    // Space: toggle play/pause
    // Arrow Left/Right: seek
    // Arrow Up/Down: volume
    // Esc: exit player
    console.log('Key pressed:', event.key);

    switch (event.key) {
      case ' ':
      case 'Spacebar':
        event.preventDefault();
        this.togglePlayPause();
        break;
      case 'ArrowLeft':
        this.seek(-10);
        break;
      case 'ArrowRight':
        this.seek(10);
        break;
      case 'ArrowUp':
        this.changeVolume(0.1);
        break;
      case 'ArrowDown':
        this.changeVolume(-0.1);
        break;
      case 'Escape':
      case 'Esc':
        this.close();
        break;
      default:
        break;
    }

  }
}
