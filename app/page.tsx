import { CardList } from "./components/CardList";
import { CategoryList } from "./components/CategoryList";
import { Featured } from "./components/Featured";
import { Section } from "./components/Section";

export default function Home({
  searchParams,
}: {
  searchParams?: { page: string };
}) {
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  return (
    <main className="pt-10 flex flex-col gap-10">
      <Featured />
      <Section section="popular" title="Popular Posts" />
      <Section section="editor" title="Editor's Picks" />
      <CategoryList />
      <div>
        <CardList page={page} title="Recent Posts" />
      </div>
    </main>
  );
}
