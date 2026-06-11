import { categories } from "../data/categories.data";
import { postsData } from "../data/posts.data";

export function getFeedPosts() {
  return postsData;
}

export function getPostById(id: string) {
  return postsData.find((post) => post.id === id);
}

export function getCategories() {
  return categories;
}
