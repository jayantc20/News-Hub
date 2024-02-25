export interface UserActivity {
  userId: string;
  articles: {
    articleId: string;
    read: boolean;
    favorite: boolean;
  }[];
}
