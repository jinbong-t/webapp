export interface AppData {
  id: string;
  title: string;
  category: string;
  url: string;
  thumbnailUrl?: string;
  description?: string;
  isActive: boolean;
  prompts?: string;
  createdAt: string;
  updatedAt: string;
}
