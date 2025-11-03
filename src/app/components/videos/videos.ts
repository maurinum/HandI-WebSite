import { Component, inject, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube';
import { LanguageService } from '../../services/language';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-videos',
  imports: [CommonModule],
  templateUrl: './videos.html',
  styleUrl: './videos.scss'
})
export class VideosComponent implements OnInit {
  youtubeService = inject(YoutubeService);
  langService = inject(LanguageService);
  sanitizer = inject(DomSanitizer);
  
  selectedVideo: any = null;

  ngOnInit() {
    // Sélectionner automatiquement la première vidéo
    if (this.youtubeService.videos().length > 0) {
      this.selectVideo(this.youtubeService.videos()[0]);
    }
  }

  selectVideo(video: any) {
    this.selectedVideo = video;
  }

  getSafeUrl(videoId: string): SafeResourceUrl {
    const url = this.youtubeService.getEmbedUrl(videoId);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  translate(key: string): string {
    return this.langService.translate(key);
  }
}
