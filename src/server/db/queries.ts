import "server-only";
import { db } from "~/server/db";
import { files_table, folders_table, DB_FileType } from "~/server/db/schema";
import { and, eq, isNull } from "drizzle-orm";

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

  getFolderById: async function (folderId: number) {
    const folder = await db
      .select()
      .from(folders_table)
      .where(eq(folders_table.id, folderId));
    return folder[0];
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
      .where(eq(folders_table.parent, folderId))
      .orderBy(folders_table.id);
  },

  getRootFolderForUser: async function (userId: string) {
    const rootFolder = await db
      .select()
      .from(folders_table)
      .where(
        and(eq(folders_table.ownerId, userId), isNull(folders_table.parent)),
      );

    return rootFolder[0];
  },
};

export const MUTATIONS = {
  createFile: async function (input: {
    file: {
      name: string;
      size: number;
      url: string;
      parent: number;
    };
    userId: string;
  }) {
    return await db.insert(files_table).values({
      ...input.file,
      ownerId: input.userId,
    });
  },

  onboardUser: async function (userId: string) {
    const rootFolder = await db
      .insert(folders_table)
      .values({
        name: "Root",
        parent: null,
        ownerId: userId,
      })
      .$returningId();

    const rootFolderId = rootFolder[0]!.id;

    await db.insert(folders_table).values({
      name: "Images",
      parent: rootFolderId,
      ownerId: userId,
    });

    await db.insert(folders_table).values({
      name: "Documents",
      parent: rootFolderId,
      ownerId: userId,
    });
    await db.insert(folders_table).values({
      name: "To Delete",
      parent: rootFolderId,
      ownerId: userId,
    });

    return rootFolderId;
  },
};
