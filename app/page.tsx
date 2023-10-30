import { CardList } from "./components/CardList";
import { CategoryList } from "./components/CategoryList";
import { EditorsPosts } from "./components/EditorsPosts";
import { Featured } from "./components/Featured";
import { PopularPosts } from "./components/PopularPosts";

export default function Home({ searchParams }: { searchParams: SearchParams }) {
  const page = parseInt(searchParams.page) || 1;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Featured />
      <PopularPosts />
      <EditorsPosts />
      <CategoryList />
      <div>
        <CardList page={page} />
      </div>
    </main>
  );
}
