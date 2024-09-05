import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <p>Hello world</p>
      <Link href={"/me"}>Go to hello me</Link>
    </div>
  );
}
