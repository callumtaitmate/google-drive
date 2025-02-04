import { db } from "~/server/db"
import { folders_table } from "~/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { mockFolders } from "~/lib/mock-data";
import { eq } from "drizzle-orm";

export default async function SandboxPage() {

    const user = await auth();

    const folders = await db.select().from(folders_table).where(eq(folders_table.ownerId, user.userId))


    console.log(folders)

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Sandbox</h1>
            <p className="text-lg">This is a sandbox page for testing and experimenting with new features.</p>

            <div>
                <h2>Seed Function</h2>

                <form action={

                    async () => {
                        "use server";

                        const user = await auth();
                        if (!user) {
                            throw new Error("User not found")
                        }

                        const rootFolder = await db.insert(folders_table).values(
                            {
                                name: "root",
                                ownerId: user.userId,
                                parent: null,
                            }
                        ).
                            $returningId();

                        const insertableFolders = mockFolders.map((folder) => ({
                            name: folder.name,
                            ownerId: user.userId,
                            parent: rootFolder[0]!.id,
                        }))
                        await db.insert(folders_table).values(insertableFolders)




                    }
                }>

                    <button type="submit">Create File</button>
                </form>
            </div>
        </div>
    )
}