export interface ArticleType {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  image_metadata: {
    width: number;
    height: number;
  };
}

export interface UserType {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}
