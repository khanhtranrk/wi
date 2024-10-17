'use client'

import dynamic from 'next/dynamic'
import {
  type MDXEditorMethods,
} from '@mdxeditor/editor'

const Editor = dynamic(() => import('./Editor'), { ssr: false })

export interface MdEditorProps {
    markdown: string;
    onChange?: (markdown: string) => void;
    editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

export function MdEditor({
    markdown,
    onChange,
    editorRef
}: Readonly<MdEditorProps>) {
  return (
    <Editor markdown={markdown} editorRef={editorRef} onChange={onChange} />
  );
}
