import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class N8nService {
  private n8nUrl: string;
  private n8nApiKey: string;

  constructor(private configService: ConfigService) {
    this.n8nUrl = this.configService.get('N8N_WEBHOOK_URL');
    this.n8nApiKey = this.configService.get('N8N_API_KEY');
  }

  async triggerSchedulePost(post: any) {
    try {
      const response = await axios.post(
        `${this.n8nUrl}/schedule-post`,
        {
          postId: post.id,
          caption: post.caption,
          platforms: post.platforms,
          scheduledFor: post.scheduledFor,
          mediaUrls: post.mediaUrls,
          hashtags: post.hashtags,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-N8N-API-KEY': this.n8nApiKey,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error triggering n8n schedule post:', error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  async triggerPublishPost(post: any) {
    try {
      const response = await axios.post(
        `${this.n8nUrl}/publish-post`,
        {
          postId: post.id,
          caption: post.caption,
          platforms: post.platforms,
          mediaUrls: post.mediaUrls,
          hashtags: post.hashtags,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-N8N-API-KEY': this.n8nApiKey,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error triggering n8n publish post:', error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  async triggerGenerateCaption(imageUrl: string) {
    try {
      const response = await axios.post(
        `${this.n8nUrl}/generate-caption`,
        {
          imageUrl,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-N8N-API-KEY': this.n8nApiKey,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error triggering n8n caption generation:', error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  async triggerLeadNotification(lead: any) {
    try {
      const response = await axios.post(
        `${this.n8nUrl}/lead-notification`,
        {
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          message: lead.message,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-N8N-API-KEY': this.n8nApiKey,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      console.error('Error triggering n8n lead notification:', error instanceof Error ? error.message : String(error));
      throw error;
    }
  }
}
