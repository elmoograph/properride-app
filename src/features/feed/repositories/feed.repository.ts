import { postsData } from "../data/posts.data";
import { categories } from "../data/categories.data";

export function getFeedPosts() {
  return postsData;
}

export function getCategories() {
  return categories;
}
