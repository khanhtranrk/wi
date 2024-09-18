import dynamic from 'next/dynamic'

const Editor = dynamic(() => import('./Editor'), { ssr: false })

export interface MdEditorProps {
    markdown: string;
}

export function MdEditor({
    markdown
}: Readonly<MdEditorProps>) {
  return (
    <Editor markdown={markdown} />
  );
}
