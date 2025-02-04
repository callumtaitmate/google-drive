import { Folder as FolderIcon, FileIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { deleteFile } from "~/server/actions";
import type { files_table, folders_table } from "~/server/db/schema";

export function FileRow(props: {
  file: typeof files_table.$inferSelect
})
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
        {file.size}
      </div>
      <div className="col-span-3 text-muted-foreground">
        <Button className="bg-red-500 text-white" onClick={() => deleteFile(file.id)}>
          <Trash2Icon className="mr-1" size={20} />
        </Button>
      </div>
    </div>
  </li>
    )
}

export function FolderRow(props:
  {folder: typeof folders_table.$inferSelect;})
{
const { folder } = props;

    return (
    
    
    <li key={folder.id} className="px-6 py-4 transition-colors hover:bg-muted/50">
    <div className="grid grid-cols-12 items-center gap-4">
      <div className="col-span-6 flex items-center">
        
          <Link
            href={`/f/${folder.id}`}
            className="flex items-center hover:text-blue-600 dark:hover:text-blue-400"
          >
            <FolderIcon className="mr-3 text-blue-600 dark:text-blue-400" size={20} />
            {folder.name}
          </Link>
        
      </div>
      <div className="col-span-3 text-muted-foreground">
      </div>
    </div>
  </li>
    )
}