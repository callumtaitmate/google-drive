"use client";

import { useState } from "react";
import { mockFiles } from "~/app/initialData";
import { Folder, FileIcon, Upload, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ThemeToggle } from "~/components/ui/theme-toggle";

export default function GoogleDriveClone() {
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

  const getCurrentFiles = () => {
    return mockFiles.filter((file) => file.parent === currentFolder);
  };

  const handleFolderClick = (folderId: string) => {
    setCurrentFolder(folderId);
  };

  const getBreadcrumbs = () => {
    const breadcrumbs = [];
    let currentId = currentFolder;

    while (currentId !== null) {
      const folder = mockFiles.find((file) => file.id === currentId);
      if (folder) {
        breadcrumbs.unshift(folder);
        currentId = folder.parent;
      } else {
        break;
      }
    }

    return breadcrumbs;
  };

  const handleUpload = () => {
    alert("Upload functionality would be implemented here");
  };

  return (
    <div className="min-h-screen bg-background p-8 text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Google Drive Clone</h1>
            <ThemeToggle />
          </div>
          <Button
            onClick={handleUpload}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <Upload className="mr-2" size={20} />
            Upload
          </Button>
        </div>

        <div className="mb-6 flex items-center">
          <Button
            onClick={() => setCurrentFolder(null)}
            variant="ghost"
            className="mr-2"
          >
            My Drive
          </Button>
          {getBreadcrumbs().map((folder, index) => (
            <div key={folder.id} className="flex items-center">
              <ChevronRight className="mx-2 text-muted-foreground" size={16} />
              <Button
                onClick={() => handleFolderClick(folder.id)}
                variant="ghost"
              >
                {folder.name}
              </Button>
            </div>
          ))}
        </div>

        <div className="rounded-lg border bg-card shadow-sm">
          <div className="border-b px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">Type</div>
              <div className="col-span-3">Size</div>
            </div>
          </div>
          <ul className="divide-y">
            {getCurrentFiles().map((file) => (
              <li key={file.id} className="px-6 py-4 transition-colors hover:bg-muted/50">
                <div className="grid grid-cols-12 items-center gap-4">
                  <div className="col-span-6 flex items-center">
                    {file.type === "folder" ? (
                      <button
                        onClick={() => handleFolderClick(file.id)}
                        className="flex items-center hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <Folder className="mr-3 text-blue-600 dark:text-blue-400" size={20} />
                        {file.name}
                      </button>
                    ) : (
                      <Link
                        href={file.url ?? "#"}
                        className="flex items-center hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <FileIcon className="mr-3 text-gray-500" size={20} />
                        {file.name}
                      </Link>
                    )}
                  </div>
                  <div className="col-span-3 text-muted-foreground">
                    {file.type === "folder" ? "Folder" : "File"}
                  </div>
                  <div className="col-span-3 text-muted-foreground">
                    {file.type === "folder" ? "--" : file.size}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}