import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IContent } from '../../models/content.model';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss']
})
/**
 * Component that displays a content card with thumbnail and metadata.
 * 
 * @remarks
 * This component represents an individual content item card that can be selected
 * and emits events when user interacts with it. It supports hover states and
 * content selection functionality.
 * 
 * @example
 * ```html
 * <app-content-card 
 *   [content]="contentItem" 
 *   (onSelect)="handleContentSelection($event)">
 * </app-content-card>
 * ```
 */
export class ContentCardComponent {

  /**
   * The content data to be displayed in the card.
   * Can be null if no content is available or still loading.
   */
  @Input() content: IContent | null = null;

  /**
   * Event emitted when the content card is selected.
   * Outputs the selected content item.
   * @event
   */
  @Output() onSelect = new EventEmitter<IContent>();

  /**
   * Indicates whether the content card is currently being hovered over by the user.
   * Used to manage hover state and trigger visual feedback or interactions.
   * @defaultValue false
   */
  isHovered = false;

  /**
   * Emits the content selection event.
   * 
   * If content is available, it emits the current content through the onSelect event emitter.
   * This method is typically called when a user selects or interacts with the content card.
   * 
   * @returns {void}
   */
  selectContent(): void {
    if (this.content) {
      this.onSelect.emit(this.content);
    }
  }

  // TODO: Añadir lazy loading para imágenes
  // TODO: Implementar manejo de errores para miniaturas faltantes
  // TODO: Añadir efectos de animación para estados hover
}
