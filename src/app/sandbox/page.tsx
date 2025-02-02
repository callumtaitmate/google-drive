import { mockFolders, mockFiles } from "../initialData";
import { files, folders } from "~/server/db/schema"
import { db } from "~/server/db";

export default function SandboxPage() {


    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Sandbox</h1>
            <p className="text-lg">This is a sandbox page for testing and experimenting with new features.</p>

            <div>
                <h2>Seed Function</h2>
                <form action={async () => {
                    "use server";


                  // const folderInsert = await db.insert(folders).values(mockFolders.map((folder, index) => ({
                    //    id: index + 1,
                      //  name: folder.name,
                        //parent: index !== 0 ? 1 : null ,
                   //  })));
                    const fileInsert = await db.insert(files).values(mockFiles.map((file, index) => ({

                        id: index + 1,
                        name: file.name,
                        size: 500,
                        url: file.url,
                        parent: (index % 3) + 1

                    })));

                    console.log(fileInsert);
                }}
                >
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Seed</button>
                </form>
            </div>
        </div>
    )
}