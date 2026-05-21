'use client';

import React, { useEffect, useMemo } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { 
  Bold, Italic, Strikethrough, Code, Heading2, Heading3, 
  List, ListOrdered, Link as LinkIcon, Image as ImageIcon, 
  Undo, Redo, RemoveFormatting, Code2, Minus, TextQuote
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

interface ToolbarBtnProps {
  onClick: () => void;
  active?: boolean;
  title: string;
  shortcut?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

function ToolbarBtn({ onClick, active, title, shortcut, disabled, children }: ToolbarBtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={shortcut ? `${title} (${shortcut})` : title}
      className={`p-2 rounded-lg transition-all duration-150 hover:bg-white/10 active:scale-95 ${
        active ? 'bg-[#2997ff]/20 text-[#2997ff] shadow-sm shadow-[#2997ff]/10' : 'text-white/50 hover:text-white/80'
      } disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}

function Separator() {
  return <span className="w-px h-5 bg-white/8 mx-1 flex-shrink-0" />;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        codeBlock: { HTMLAttributes: { class: 'bg-black/30 rounded-lg p-4 text-sm font-mono border border-white/10 my-4 overflow-x-auto' } },
        horizontalRule: { HTMLAttributes: { class: 'my-8 border-white/10' } },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-accent underline cursor-pointer' },
      }),
      Image.configure({
        HTMLAttributes: { class: 'rounded-xl max-w-full my-6 border border-white/10 shadow-lg mx-auto block' },
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert focus:outline-none min-h-[300px] max-h-[600px] overflow-y-auto p-5 blog-content',
        style: 'outline: none;',
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const stats = useMemo(() => {
    if (!editor) return { words: 0, chars: 0 };
    const text = editor.state.doc.textContent;
    return {
      words: text.trim() ? text.trim().split(/\s+/).length : 0,
      chars: text.length,
    };
  }, [editor]);

  if (!editor) {
    return (
      <div className="w-full h-[350px] bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/40">
        Loading editor...
      </div>
    );
  }

  const addLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter link URL:', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="w-full bg-white/3 border border-white/10 rounded-xl overflow-hidden focus-within:border-[#2997ff] focus-within:ring-2 focus-within:ring-[#2997ff]/15 transition-all group">
      <div className="flex flex-wrap gap-0.5 p-1.5 bg-white/[0.04] border-b border-white/10 items-center select-none">
        
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold" shortcut="Ctrl+B">
          <Bold size={15} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic" shortcut="Ctrl+I">
          <Italic size={15} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough">
          <Strikethrough size={15} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} title="Inline Code">
          <Code size={15} />
        </ToolbarBtn>

        <Separator />

        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2">
          <Heading2 size={15} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3">
          <Heading3 size={15} />
        </ToolbarBtn>

        <Separator />

        <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List">
          <List size={15} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered List">
          <ListOrdered size={15} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote">
          <TextQuote size={15} />
        </ToolbarBtn>

        <Separator />

        <ToolbarBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Code Block">
          <Code2 size={15} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} active={false} title="Horizontal Rule">
          <Minus size={15} />
        </ToolbarBtn>

        <Separator />

        <ToolbarBtn onClick={addLink} active={editor.isActive('link')} title="Insert Link" shortcut="Ctrl+K">
          <LinkIcon size={15} />
        </ToolbarBtn>
        <ToolbarBtn onClick={addImage} active={false} title="Insert Image">
          <ImageIcon size={15} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} active={false} title="Clear Formatting">
          <RemoveFormatting size={15} />
        </ToolbarBtn>

        <div className="ml-auto flex items-center gap-0.5">
          <Separator />
          <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo" shortcut="Ctrl+Z">
            <Undo size={15} />
          </ToolbarBtn>
          <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo" shortcut="Ctrl+Shift+Z">
            <Redo size={15} />
          </ToolbarBtn>
        </div>
      </div>

      <EditorContent editor={editor} className="bg-transparent" />

      <div className="flex items-center justify-end gap-4 px-5 py-2 bg-white/[0.02] border-t border-white/5 text-xs text-white/30">
        <span>{stats.words} words</span>
        <span>{stats.chars} characters</span>
      </div>
    </div>
  );
}
