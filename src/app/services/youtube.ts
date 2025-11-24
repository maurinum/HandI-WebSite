import { Injectable, signal } from '@angular/core';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  // Remplacez par votre clé API YouTube et votre Channel ID
  private API_KEY = 'AIzaSyCXf4ZoXUdxVKFnmlxdXWTw8AYc7BibrZc';
  private CHANNEL_ID = 'UCBhcUhKowYEhI-Pq-EGXuXA';
  
  videos = signal<YouTubeVideo[]>([]);
  
  constructor() {
    // Charger les vidéos au démarrage
    this.loadVideos();
  }

  async loadVideos() {
    try {
      // Chargement des vraies vidéos depuis YouTube API
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${this.API_KEY}&channelId=${this.CHANNEL_ID}&part=snippet,id&order=date&maxResults=20`
      );
      
      const data = await response.json();
      
      if (data.error) {
        console.error('Erreur API YouTube:', data.error);
        return;
      }
      
      const videoList: YouTubeVideo[] = data.items
        .filter((item: any) => item.id.kind === 'youtube#video')
        .map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.high.url,
          publishedAt: item.snippet.publishedAt
        }));
      
      this.videos.set(videoList);
    } catch (error) {
      console.error('Erreur lors du chargement des vidéos:', error);
    }
  }

  getVideoUrl(videoId: string): string {
    return `https://www.youtube.com/watch?v=${videoId}`;
  }
  
  getEmbedUrl(videoId: string): string {
    return `https://www.youtube.com/embed/${videoId}`;
  }
}
