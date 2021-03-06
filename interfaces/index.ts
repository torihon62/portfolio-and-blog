// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number;
  name: string;
};

export interface Category {
  category: string;
  createdAt: string;
  id: string;
  publishedAt: string;
  revisedAt: string;
  updatedAt: string;
}

export interface ImageResponse {
  url: string;
  width: number;
  height: number;
}

export interface Post {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
  category: Category[];
  eyeCatch?: ImageResponse;
}

export interface Skill {
  id: string;
  name: string;
  experience: string;
  rating: number;
}

export interface Work {
  id: string;
  title: string;
  url: string;
  source: string;
  description: string;
  period: string;
  technologies: Skill[];
  image: ImageResponse;
}

export interface SkillSet {
  id: string;
  name: string;
  contents: Skill[];
}
