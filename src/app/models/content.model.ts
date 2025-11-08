/**
 * Represents a content item in the application.
 * 
 * @interface IContent
 * @property {string} id - Unique identifier for the content item
 * @property {string} title - Title of the content
 * @property {string} description - Detailed description of the content
 * @property {string} thumbnail - URL or path to the thumbnail image
 * @property {number} duration - Duration of the content in seconds
 * @property {string} videoUrl - URL to the video file or stream
 * @property {string} [posterUrl] - Optional URL or path to the poster image
 * @property {number} [year] - Optional year of release or publication
 * @property {number} [rating] - Optional rating score for the content
 * @property {string[]} [genre] - Optional array of genre classifications
 */
export interface IContent {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  videoUrl: string;
  posterUrl?: string;
  year?: number;
  rating?: number;
  genre?: string[];
}
