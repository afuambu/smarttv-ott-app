import { Component, OnInit } from '@angular/core';
import { IContent } from './models/content.model';
import { ContentService } from './services/content.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
/**
 * Root application component. Manages global application state such as
 * categories, currently selected content and player visibility.
 *
 * @remarks
 * This component bootstraps the main UI and uses {@link ContentService}
 * to retrieve initial content categories on initialization.
 */
export class AppComponent implements OnInit {
  /**
   * Application title displayed in the UI header.
   * @type {string}
   */
  title = 'SmartTV OTT Application';

  /**
   * Currently selected content item to be played. Null when no item is selected.
   * @type {(IContent | null)}
   */
  selectedContent: IContent | null = null;

  /**
   * Whether the video player overlay should be shown.
   * @type {boolean}
   */
  showPlayer = false;

  /**
   * Categories retrieved from the content service. Each category contains a name and
   * an array of content items.
   * @type {any[]}
   */
  categories: any[] = [];

  constructor(private contentService: ContentService) { }

  /**
   * Angular lifecycle hook called after component initialization.
   * Fetches categories from the {@link ContentService} to populate the UI.
   */
  ngOnInit(): void {
    this.categories = this.contentService.getCategories();
  }

  /**
   * Handler invoked when a content item is selected from a child component (carousel/card).
   * Sets the selected content and opens the player overlay.
   *
   * @param {IContent} content - The content item selected by the user.
   */
  onContentSelected(content: IContent): void {
    this.selectedContent = content;
    this.showPlayer = true;
  }

  /**
   * Handler invoked when the player overlay signals it has been closed.
   * It hides the player and clears the selected content.
   */
  onPlayerClosed(): void {
    this.showPlayer = false;
    this.selectedContent = null;
  }

  // TODO: Implementar navegación por teclado para atajos globales
  // TODO: Añadir soporte para eventos de control remoto
  // TODO: Implementar gestión del foco para accesibilidad
}
