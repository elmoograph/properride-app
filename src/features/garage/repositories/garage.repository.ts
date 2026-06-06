import { userData } from "../data/user.data";
import { statsData } from "../data/stats.data";

export async function getGarageUser() {
  return userData;
}

export async function getGarageStats() {
  return statsData;
}
