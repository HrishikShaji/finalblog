import { Category, Comment, Post, User, Vote } from "@prisma/client";

export type ExtendedPost = Post & {
  user: User;
  votes: Vote[];
  comments: Comment[];
};

// VerificationToken.ts
export type VerificationToken = {
  identifier: string;
  token: string;
  expires: Date;
};

// Category.ts
export type ExtendedCategory = Category & {
  posts: Post[];
};
export type CommentChild = {
  id: string;
  desc: string;
  user: User;
  createdAt: Date;
  children: CommentChild[];
};

export enum CategorySlug {
  Coding,
  Style,
  Travel,
}
