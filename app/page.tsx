import { Featured } from "./components/Featured";
import { PopularPosts } from "./components/PopularPosts";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Featured />
      <PopularPosts />
    </main>
  );
}
