interface Post {
  id: string;
  title: string;
  topics: TopicBlock[];
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

interface TopicBlock {
  id: string;
  topicName: string;
  lessons: string[];
}

export type { Post, User, Topic, TopicBlock };
