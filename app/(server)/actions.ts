"use server";
import { getCharacter } from "@/app/(server)/services/character";
import { db } from "@/db/db";
import { chatParticipants } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const swapCharacter = async () => {
  const { userId } = await auth();

  await db
    .delete(chatParticipants)
    .where(eq(chatParticipants.user_id, userId!));

  const response = await getCharacter();

  revalidatePath("/", 'page')
  return response;
};
