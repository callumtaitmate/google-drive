"use client";
import { ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ThemeToggle } from "~/components/ui/theme-toggle";
import { FileRow, FolderRow } from "./file-row";
import { files_table, folders_table } from "~/server/db/schema";
import Link from "next/link";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { UploadButton } from "~/components/ui/uploadthing";
import { useRouter } from "next/navigation";

export default function DriveContents(props: {
  files: typeof files_table.$inferSelect[],
  folders: typeof folders_table.$inferSelect[],
  parents: typeof folders_table.$inferSelect[],
  currentFolderId: number;
}
) {

  const navigate = useRouter();

  return (
    <div className="min-h-screen bg-background p-8 text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">store-my-files</h1>
            <ThemeToggle />
          </div>
          <div className="flex items-center">
            <Button
              className="bg-blue-600 text-white hover:bg-blue-700"
            >Upload</Button>
            <div className="px-3 flex items-center">
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>

        <div className="mb-6 flex items-center">
          <Link
            href={`/f/1125899906842625`}
            className="mr-2"
          >
            My Drive
          </Link>
          {props.parents.map((folder) => (
            <div key={folder.id} className="flex items-center">
              <ChevronRight className="mx-2 text-muted-foreground" size={16} />
              <Link
                href={`/f/${folder.id}`}
              >
                {folder.name}
              </Link>
            </div>
          ))}
        </div>

        <div className="rounded-lg border bg-card shadow-sm">
          <div className="border-b px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">Size</div>
              <div className="col-span-1">Action</div>
            </div>
          </div>
          <ul className="divide-y">
            {props.folders.map((folder) => (
              <FolderRow key={folder.id} folder={folder} />
            ))}
            {props.files.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <UploadButton input={{
            folderId: props.currentFolderId

          }} endpoint="driveUploader" onClientUploadComplete={() => navigate.refresh()} /></div>
      </div>
    </div>
  );
}