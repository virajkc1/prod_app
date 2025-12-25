interface Post {
  id: string;
  title: string;
  topic: string;
  lessons: string[];
  date: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

export type { Post, User };
