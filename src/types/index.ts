export type User = {
  id: string;
  name: string;
  email: string;
  bio?: string;
};

export type Credentials = { email: string; password: string };

export type Content = {
  id: string;
  title: string;
  youtubeUrl: string;
  publiclyViewable: boolean;
};

export type UserProfile = User & {
  contents: Content[];
};
