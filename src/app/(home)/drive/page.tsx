import { auth } from "@clerk/nextjs/server";
import { ArrowBigRight, CheckCircle2Icon, TicketCheckIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { MUTATIONS, QUERIES } from "~/server/db/queries";

export default async function DrivePage() {
    const session = await auth();

    if (!session.userId) {
        return redirect("/sign-in");
    }

    const rootFolder = await QUERIES.getRootFolderForUser(session.userId);


    if (!rootFolder) {
        return (
            <form action={async () => {
                "use server";

                const session = await auth();
                if (!session.userId) {
                    return redirect("/sign-in");
                }


                const rootFolderId = await MUTATIONS.onboardUser(session.userId);
                return redirect(`/f/${rootFolderId}`);

            }}
            >
                <section className="py-24">
                    <div className="grid w-full grow items-center px-4 sm:justify-center">
                        <div className="flex items-center">
                            <Card className="w-full sm:w-96">
                                <CardHeader className="flex flex-col items-center">

                                    <CheckCircle2Icon className="text-green-500 h-6 w-6 mb-1" />
                                    <CardTitle>
                                        Welcome to store-my-files
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-y-4">

                                    <Button className="flex items-center justify-between">Click to create your Drive<ArrowBigRight className="h-6 w-6" /></Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </form>
        )
    }





    if (!rootFolder) {
        return redirect("/drive/create-root-folder");
    }

    return redirect(`/f/${rootFolder.id}`);







}