import { MdEditor } from '@/components';
import { useEffect, useState } from 'react';
import { newWService } from 'wegs-node-sdk';

interface PageProps {
  params: {
    notebookId: string;
    pageId: string;
  }
}

export default function Page({ params }: PageProps) {
  const [content, setContent] = useState<string>('Loading');

  useEffect(() => {
    let wService = newWService('http://localhost:8080');
  }, []);

  return (
    <MdEditor markdown={content} />
  );
}
