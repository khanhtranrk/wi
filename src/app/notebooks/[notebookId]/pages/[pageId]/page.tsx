import { MdEditor } from '@/components';

interface PageProps {
  params: {
    notebookId: string;
    pageId: string;
  }
}

export default function Page({ params }: PageProps) {
  return (
    <MdEditor markdown={`Hello **world**! ${params.notebookId} ${params.pageId}`} />
  );
}
