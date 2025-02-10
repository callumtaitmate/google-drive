import { Suspense } from "react";
import Loading from "../loading";

export default function HomePage(props: { children: React.ReactNode }) {
  return (
    <div className="">
      <Suspense fallback={<Loading />}>
        <main className="text-center">{props.children}</main>
      </Suspense>
    </div>
  );
}