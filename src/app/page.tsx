"use client";

import { useMemo, useState } from "react";
import { mockFiles, mockFolders } from "~/app/initialData";
import { Upload, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ThemeToggle } from "~/components/ui/theme-toggle";
import { FileRow, FolderRow } from "./file-row";

export default function GoogleDriveClone() {
  const [currentFolder, setCurrentFolder] = useState<string>("root");

  const getCurrentFiles = () => {
    return mockFiles.filter((file) => file.parent === currentFolder);
  };
  const getCurrentFolders = () => {
    return mockFolders.filter((folder) => folder.parent === currentFolder);
  };

  const handleFolderClick = (folderId: string) => {
    setCurrentFolder(folderId);
  };

  const breadcrumbs = useMemo(() => {
    const breadcrumbs = [];
    let currentId = currentFolder;

    while (currentId !== "root") {
      const folder = mockFolders.find((file) => file.id === currentId);
      if (folder) {
        breadcrumbs.unshift(folder);
        currentId = folder.parent ?? "root";
      } else {
        break;
      }
    }

    return breadcrumbs;
  }, [currentFolder]);

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
            onClick={() => setCurrentFolder("root")}
            variant="ghost"
            className="mr-2"
          >
            My Drive
          </Button>
          {breadcrumbs.map((folder) => (
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
            {getCurrentFolders().map((folder) => (
              <FolderRow key={folder.id} folder={folder} handleFolderClick={() => handleFolderClick(folder.id)} /> 
            ))}
            {getCurrentFiles().map((file) => (
              <FileRow key={file.id} file={file}/>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}