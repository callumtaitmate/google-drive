export default function HomePage(props: { children: React.ReactNode }) {
    return (
      <div className="">
        <main className="text-center">{props.children}</main>
      </div>
    );
  }