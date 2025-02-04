"use server";

import { and, eq } from "drizzle-orm";
import { db } from "./db";
import { files_table } from "./db/schema";
import { auth } from "@clerk/nextjs/server";
import { UTApi } from "uploadthing/server";
import { cookies } from "next/headers";

const UTApiInstance = new UTApi();

export async function deleteFile(fileId: number) {
  const session = await auth();
  if (!session.userId) {
    return { error: "You must be logged in to delete a file" };
  }

  const [file] = await db
    .select()
    .from(files_table)
    .where(
      and(eq(files_table.ownerId, session.userId), eq(files_table.id, fileId)),
    );



    if (!file) {
        return { error: "File not found" };
    }


    await UTApiInstance.deleteFiles([file.url.replace("https://utfs.io/f/", "")]);

    const dbDeleteResult = await db.
    delete(files_table)
    .where(eq(files_table.id, fileId));

    console.log(dbDeleteResult);

    const c = await cookies();

    c.set("force-refresh", JSON.stringify(Math.random()));
    
    return { success: true };



}
