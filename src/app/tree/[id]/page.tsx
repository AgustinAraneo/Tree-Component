import { TreeDetail } from "@/components/TreeDetail";

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return <TreeDetail id={id} />;
};

export default Page;
