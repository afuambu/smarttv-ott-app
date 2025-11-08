import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IContent } from '../../models/content.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
/**
 * A carousel component that displays a sliding list of content items.
 * 
 * @remarks
 * This component provides navigation controls to move through a collection of items,
 * displaying a configurable number of items at a time. It supports next/previous navigation
 * and emits events when content is selected.
 * 
 * @example
 * ```html
 * <app-carousel 
 *   [items]="contentList" 
 *   (onContentSelected)="handleContentSelection($event)">
 * </app-carousel>
 * ```
 * 
 * @public
 */
export class CarouselComponent {
  /**
   * Array of content items to be displayed in the carousel.
   * Each item represents a piece of content that will be rendered as a carousel slide.
   * @default []
   */
  @Input() items: IContent[] = [];

  /**
   * Event emitted when a content item is selected from the carousel.
   * 
   * @event
   * @type {EventEmitter<IContent>}
   * @description Fires when a user selects a content item, emitting the selected content object.
   */
  @Output() onContentSelected = new EventEmitter<IContent>();

  /**
   * The current index of the active item in the carousel.
   * Represents the position of the currently displayed or focused carousel item.
   * @default 0
   */
  currentIndex = 0;

  /**
   * The number of items visible in the carousel at once.
   * @default 4
   */
  visibleItemsCount = 4;

  // TODO: Improve carousel logic for different screen sizes
  // TODO: Add smooth transitions between carousel positions
  // TODO: Implement keyboard navigation (left/right arrows)

  /**
   * Gets the currently visible items from the carousel based on the current index and visible items count.
   * 
   * @returns An array of IContent items that are currently visible in the carousel viewport.
   * The returned array contains a subset of items starting from the current index up to the visible items count.
   */
  getVisibleItems(): IContent[] {
    return this.items.slice(this.currentIndex, this.currentIndex + this.visibleItemsCount);
  }

  /**
   * Determines if the carousel can move to the next set of items.
   * 
   * @returns {boolean} `true` if there are more items available to display after the current visible items, `false` otherwise.
   */
  canMoveNext(): boolean {
    return this.currentIndex + this.visibleItemsCount < this.items.length;
  }

  /**
   * Checks if the carousel can move to the previous item.
   * @returns {boolean} True if the current index is greater than 0, false otherwise.
   */
  canMovePrev(): boolean {
    return this.currentIndex > 0;
  }

  /**
   * Moves the carousel to the next item if possible.
   * Increments the current index by one if the carousel can move forward.
   * 
   * @returns void
   * @see {@link canMoveNext} for the condition that determines if moving forward is allowed
   */
  moveNext(): void {
    if (this.canMoveNext()) {
      this.currentIndex++;
    }
  }

  /**
   * Moves the carousel to the previous item.
   * Decrements the current index by one if there are previous items available.
   * This method checks if moving to the previous item is possible before performing the operation.
   * 
   * @returns {void}
   */
  movePrev(): void {
    if (this.canMovePrev()) {
      this.currentIndex--;
    }
  }

  /**
   * Emits an event when content is selected from the carousel.
   * 
   * @param content - The content item that was selected by the user
   * @returns void
   */
  selectContent(content: IContent): void {
    this.onContentSelected.emit(content);
  }

  // TODO: Add loop functionality for continuous carousel
  // TODO: Add auto-scroll feature with configurable timeout
}
