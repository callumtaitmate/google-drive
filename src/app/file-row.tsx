import type { Folder, File } from "./initialData"
import { Folder as FolderIcon, FileIcon } from "lucide-react";
import Link from "next/link";

export function FileRow(props: {file: File})
{
    const { file } = props;
    return (
    
    
    <li key={file.id} className="px-6 py-4 transition-colors hover:bg-muted/50">
    <div className="grid grid-cols-12 items-center gap-4">
      <div className="col-span-6 flex items-center">
          <Link
            href={file.url}
            className="flex items-center hover:text-blue-600 dark:hover:text-blue-400"
            target="_blank"
          >
            <FileIcon className="mr-3 text-gray-500" size={20} />
            {file.name}
          </Link>
      </div>
      <div className="col-span-3 text-muted-foreground">
        {"file"}
      </div>
      <div className="col-span-3 text-muted-foreground">
        {file.type === "folder" ? "--" : file.size}
      </div>
    </div>
  </li>
    )
}

export function FolderRow(props: {folder: Folder, handleFolderClick: () => void})
{
const { folder, handleFolderClick } = props;

    return (
    
    
    <li key={folder.id} className="px-6 py-4 transition-colors hover:bg-muted/50">
    <div className="grid grid-cols-12 items-center gap-4">
      <div className="col-span-6 flex items-center">
        
          <button
            onClick={() => handleFolderClick()}
            className="flex items-center hover:text-blue-600 dark:hover:text-blue-400"
          >
            <FolderIcon className="mr-3 text-blue-600 dark:text-blue-400" size={20} />
            {folder.name}
          </button>
        
      </div>
      <div className="col-span-3 text-muted-foreground">
      </div>
    </div>
  </li>
    )
}