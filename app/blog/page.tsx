import { CardList } from "@/app/components/CardList";

type SearchParams = {
  cat: string;
  sec: string;
  page: string;
};

const Page = ({ searchParams }: { searchParams: SearchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams;
  return (
    <div className="pt-10 flex flex-col gap-10">
      <CardList page={page} cat={cat} title={cat} />
    </div>
  );
};

export default Page;
