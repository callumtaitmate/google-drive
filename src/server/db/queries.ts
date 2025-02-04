import "server-only";
import { db } from "~/server/db";
import { files_table, folders_table, DB_FileType } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const QUERIES = {
  getAllParentsForFolder: async function (folderId: number) {
    const parents = [];
    let currentId: number | null = folderId;

    while (currentId !== null) {
      const folder = await db
        .selectDistinct()
        .from(folders_table)
        .where(eq(folders_table.id, currentId));

      if (!folder[0]) {
        throw new Error("Folder not found");
      }

      parents.unshift(folder[0]);
      currentId = folder[0]?.parent;
    }
    return parents;
  },

  getFolders: function (folderId: number) {
    return db
      .select()
      .from(files_table)
      .where(eq(files_table.parent, folderId));
  },

  getFiles: function (folderId: number) {
    return db
      .select()
      .from(folders_table)
      .where(eq(folders_table.parent, folderId));
  },
};

export const MUTATIONS = {
  createFile: async function (input: {
    file: {
      name: string;
      size: number;
      url: string;
    };
    userId: string;
  }) {

    return await db.insert(files_table).values({
      ...input.file,
      parent: 1,
    });
  },
};
