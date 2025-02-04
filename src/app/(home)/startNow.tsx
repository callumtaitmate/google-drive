import { auth } from "@clerk/nextjs/server";
import { Button } from "../../components/ui/button"
import { redirect } from "next/navigation";

export default function StartNow() {
  return (
    
    <form
    action={async() => {
        
        return redirect("/sign-in");

    }}
    >

    <Button className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800" size="sm">
          Start Now
        </Button>
        </form>
  )
}

