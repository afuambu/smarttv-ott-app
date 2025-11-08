import { Injectable } from '@angular/core';
import { IContent } from '../models/content.model';

@Injectable({
  providedIn: 'root'
})
/**
 * Service responsible for managing and providing content data for the application.
 * 
 * @remarks
 * This service currently uses in-memory mock data for demonstration purposes.
 * In a production environment, this should be replaced with actual API calls
 * to fetch content from a backend service.
 * 
 * The service provides methods to:
 * - Retrieve categorized content lists
 * - Fetch individual content items by their identifier
 * 
 * @example
 * ```typescript
 * const contentService = new ContentService();
 * const categories = contentService.getCategories();
 * const content = contentService.getContentById('1');
 * ```
 * 
 * @see {@link IContent} for the content item interface definition
 */
export class ContentService {

  /**
   * In-memory mock content list used by the demo application.
   * Replace with real API calls in production.
   * @private
   * @type {IContent[]}
   */
  private mockContent: IContent[] = [
    {
      id: '1',
      title: 'Documentary Nature',
      description: 'Discover the wonders of the natural world',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&fit=crop',
      duration: 596,
      year: 2024,
      rating: 8.5,
      genre: ['Documentary', 'Nature']
    },
    {
      id: '2',
      title: 'Sunset Adventure',
      description: 'Experience stunning sunsets around the world',
      thumbnail: 'https://images.unsplash.com/photo-1495505374667-c15da529cb21?w=400&h=250&fit=crop',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1495505374667-c15da529cb21?w=1280&fit=crop',
      duration: 653,
      year: 2024,
      rating: 8.0,
      genre: ['Travel', 'Nature']
    },
    {
      id: '3',
      title: 'Mountain Journey',
      description: 'An epic climb through majestic peaks',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&fit=crop',
      duration: 654,
      year: 2024,
      rating: 8.8,
      genre: ['Adventure', 'Nature']
    },
    {
      id: '4',
      title: 'Ocean Wonders',
      description: 'Explore the mysteries beneath the waves',
      thumbnail: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=250&fit=crop',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1280&fit=crop',
      duration: 620,
      year: 2024,
      rating: 8.7,
      genre: ['Documentary', 'Nature']
    },
    {
      id: '5',
      title: 'Urban Lights',
      description: 'City life in vivid colors and motion',
      thumbnail: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&fit=crop',
      duration: 572,
      year: 2024,
      rating: 7.9,
      genre: ['Urban', 'Travel']
    },
    {
      id: '6',
      title: 'Wildlife Close-up',
      description: 'Intimate moments with amazing creatures',
      thumbnail: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?w=400&h=250&fit=crop',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?w=1280&fit=crop',
      duration: 888,
      year: 2024,
      rating: 8.6,
      genre: ['Documentary', 'Wildlife']
    }
  ];

  /**
   * Retrieves a list of content categories with their associated content items.
   * 
   * @returns An array of category objects, each containing:
   * - `name`: The display name of the category
   * - `content`: An array of content items belonging to that category
   * 
   * The returned categories include:
   * - "Trending Now": Contains the first 3 items from mockContent
   * - "Nature and Travel": Contains items 1-3 from mockContent
   * - "Featured Collection": Contains all items from mockContent
   */
  getCategories(): any[] {
    return [
      {
        name: 'Trending Now',
        content: this.mockContent.slice(0, 3)
      },
      {
        name: 'Nature and Travel',
        content: this.mockContent.slice(1, 4)
      },
      {
        name: 'Featured Collection',
        content: this.mockContent
      }
    ];
  }

  /**
   * Returns a content item by its identifier.
   *
   * @param {string} id - The unique identifier of the content item to retrieve.
   * @returns {(IContent | undefined)} The content item if found, otherwise undefined.
   *
   * @remarks
   * Currently this method performs a lookup in the in-memory `mockContent` array.
   */
  // TODO: Reemplazar datos mock por llamadas a una API real
  // TODO: Implementar paginación para grandes catálogos de contenido
  // TODO: Añadir capacidades de filtrado y ordenación
  getContentById(id: string): IContent | undefined {
    return this.mockContent.find(content => content.id === id);
  }
}
