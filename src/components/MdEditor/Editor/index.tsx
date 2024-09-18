'use client'

import { FC } from "react";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  frontmatterPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  directivesPlugin,
  diffSourcePlugin,
  toolbarPlugin,
  MDXEditor,
  KitchenSinkToolbar,
  AdmonitionDirectiveDescriptor,
  type MDXEditorMethods,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css';
import './styles.css';
import styles from './styles.module.scss';

interface EditorProps {
  markdown: string;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

const MdEditor: FC<EditorProps> = ({ markdown, editorRef }) => {
  return (
    <MDXEditor
      className={styles.editor}
      contentEditableClassName='prose-editor'
      plugins={[
        listsPlugin(),
        quotePlugin(),
        headingsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin(),
        tablePlugin(),
        thematicBreakPlugin(),
        frontmatterPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
        codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text', tsx: 'TypeScript' } }),
        directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
        diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'boo' }),
        markdownShortcutPlugin(),
        toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),
      ]}
      onChange={(e) => console.log(e)}
      ref={editorRef}
      markdown={markdown}
    />
  )
}

export default MdEditor;
