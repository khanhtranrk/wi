'use client'

import { MdEditor } from '@/components';
import { MDXEditorMethods } from '@mdxeditor/editor';
import React, { useEffect, useRef, useState } from 'react';
import { newWService, NotebookPage } from 'wegs-node-sdk';

interface PageProps {
  params: {
    notebookId: number;
    pageId: string;
  }
}

const wService = newWService('http://localhost:8080');

export default function Page({ params }: PageProps) {
  const [page, setPage] = useState<NotebookPage>({
    id: '',
    name: '',
    description: '',
    content: '',
    theme: '',
    parentId: '',
  });
  const ref = useRef<MDXEditorMethods>(null);

  useEffect(() => {
    wService.notebook.getPage(params.notebookId, params.pageId).then((page) => {
      setPage(page);
      ref.current?.setMarkdown(page.content);
    });
  }, [params.notebookId, params.pageId]);

  function handleChange(markdown: string) {
    wService.notebook.updatePage(params.notebookId, { ...page, content: markdown }).then(() => {
      setPage({ ...page, content: markdown });
    });
  }

  return (
    <MdEditor markdown={page.content} onChange={handleChange} editorRef={ref} />
  );
}
