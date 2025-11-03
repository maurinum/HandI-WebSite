import { Injectable, signal } from '@angular/core';
import { AssistantSlim, PersonaRaw } from '../models/chat';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AssistantService {
  // UI-friendly state
  assistants = signal<AssistantSlim[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  private endpoint = `${environment.apiBaseUrl}/api/persona`;

  constructor(private http: HttpClient) { }

  /** Load from backend and map to slim assistants */
  refresh() {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<PersonaRaw[]>(this.endpoint).subscribe({
      next: (rows) => {
        const mapped: AssistantSlim[] = (rows || []).map(r => ({
          id: r.id,
          name: r.name,
          llm_model_version_override: r.llm_model_version_override ?? null,
          llm_model_provider_override: r.llm_model_provider_override ?? null,
        }));
        this.assistants.set(mapped);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err?.message ?? 'Failed to load assistants');
        this.loading.set(false);
      }
    });
  }

  getById(id: number) {
    return this.assistants().find(a => a.id === id);
  }
}
