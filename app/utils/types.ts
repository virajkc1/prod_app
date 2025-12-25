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

interface Topic {
  id: string;
  name: string;
  defaultLessons: string[];
  createdAt: string;
}

export type { Post, User, Topic };
