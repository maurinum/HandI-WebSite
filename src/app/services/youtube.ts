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
  private API_KEY = 'VOTRE_CLE_API_YOUTUBE';
  private CHANNEL_ID = 'VOTRE_CHANNEL_ID';
  
  videos = signal<YouTubeVideo[]>([]);
  
  constructor() {
    // Charger les vidéos au démarrage
    this.loadVideos();
  }

  async loadVideos() {
    try {
      // Pour le moment, utilisez des vidéos de démonstration
      // Décommentez le code ci-dessous après avoir configuré votre clé API
      
      /*
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${this.API_KEY}&channelId=${this.CHANNEL_ID}&part=snippet,id&order=date&maxResults=20`
      );
      
      const data = await response.json();
      
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
      */
      
      // Vidéos de démonstration
      this.videos.set([
        {
          id: 'dQw4w9WgXcQ',
          title: 'Introduction à H&I - Plateforme IA',
          description: 'Découvrez comment H&I transforme l\'utilisation de l\'intelligence artificielle',
          thumbnail: 'https://via.placeholder.com/480x360/667eea/ffffff?text=Video+1',
          publishedAt: new Date().toISOString()
        },
        {
          id: 'dQw4w9WgXcQ',
          title: 'Créer votre premier Agent IA',
          description: 'Tutoriel complet pour créer et configurer un agent IA personnalisé',
          thumbnail: 'https://via.placeholder.com/480x360/764ba2/ffffff?text=Video+2',
          publishedAt: new Date().toISOString()
        },
        {
          id: 'dQw4w9WgXcQ',
          title: 'Intégration avec vos outils',
          description: 'Connectez H&I à vos applications métier préférées',
          thumbnail: 'https://via.placeholder.com/480x360/f093fb/ffffff?text=Video+3',
          publishedAt: new Date().toISOString()
        }
      ]);
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
