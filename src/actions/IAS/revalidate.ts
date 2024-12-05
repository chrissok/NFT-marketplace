"use server";

import { revalidateTag } from "next/cache";

export default async function revalidateRequestByTag(tag: string) {
  revalidateTag(tag);
}
