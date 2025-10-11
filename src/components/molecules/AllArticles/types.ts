export interface IArticle {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type TAllArticles = {
  data?: IArticle[];
  loading?: boolean
  error?: boolean
  onChange?: (id: string) => void
};
