import { CardList } from "./components/CardList";
import { CategoryList } from "./components/CategoryList";
import { EditorsPosts } from "./components/EditorsPosts";
import { Featured } from "./components/Featured";
import { PopularPosts } from "./components/PopularPosts";

export default function Home({
  searchParams,
}: {
  searchParams?: { page: string };
}) {
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  return (
    <main className="pt-10 flex flex-col gap-10">
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
