import DriveContents from "~/app/f/[folderId]/drive-contents";
import { QUERIES } from "~/server/db/queries"
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function GoogleDriveClone(props: { params: Promise<{ folderId: string }> }) {

  const session = await auth();

  console.log(session.userId)
  
      if (!session.userId) {
        
          return redirect("/sign-in");
      }

  const params = await props.params;
  const parsedFolderId = parseInt(params.folderId);
  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }


  const [folders, files, parents] = await Promise.all([
    QUERIES.getFiles(parsedFolderId),
    QUERIES.getFolders(parsedFolderId),
    QUERIES.getAllParentsForFolder(parsedFolderId)
  ])


  return <DriveContents files={files} folders={folders} parents={parents} currentFolderId={parsedFolderId} />;

}