import { MdEditor } from '@/components';

interface PageProps {
  params: {
    notebookId: string;
  }
}

export default function Page({ params }: PageProps) {
  return (
    <MdEditor markdown={`# This notebook's id is ${params.notebookId}`} />
  );
}
