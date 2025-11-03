export type Role = 'user' | 'assistant' | 'system';

export interface AssistantSlim {
    id: number;                                 // <- number now
    name: string;
    llm_model_version_override?: string | null;
    llm_model_provider_override?: string | null;
}


export interface Message {
    id: string;
    sessionId: string;
    role: 'user' | 'assistant' | 'system';
    text: string;
    createdAt: number;
    assistantId?: number;
    /** server-side message id (for assistant replies) */
    serverMessageId?: number;   // <- NEW
}

export interface ChatSession {
    id: string;
    createdAt: number;
    assistantId: number;                         // <- number now
}
export interface PersonaRaw {
    id: number;
    name: string;
    llm_model_version_override?: string | null;
    llm_model_provider_override?: string | null;
    // ...other fields returned by the API (tools, document_sets, etc.)
}