'use client';

import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { 
  Bold, Italic, Strikethrough, Code, Heading2, Heading3, 
  List, ListOrdered, Quote, Link as LinkIcon, Image as ImageIcon, 
  Undo, Redo, RemoveFormatting 
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder = 'Write your amazing post content here...' }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-accent underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-xl max-w-full my-6 border border-white/10 shadow-lg mx-auto block',
        },
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

  // Keep TipTap sync'd if external content resets (e.g. on page loads)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

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
    <div className="w-full bg-white/3 border border-white/10 rounded-xl overflow-hidden focus-within:border-[#2997ff] focus-within:ring-2 focus-within:ring-[#2997ff]/15 transition-all">
      {/* Visual Rich Text Editing Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-white/5 border-b border-white/10 items-center select-none">
        
        {/* Formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg transition-colors hover:bg-white/10 ${editor.isActive('bold') ? 'bg-[#2997ff]/20 text-[#2997ff]' : 'text-white/60'}`}
          title="Bold"
        >
          <Bold size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg transition-colors hover:bg-white/10 ${editor.isActive('italic') ? 'bg-[#2997ff]/20 text-[#2997ff]' : 'text-white/60'}`}
          title="Italic"
        >
          <Italic size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded-lg transition-colors hover:bg-white/10 ${editor.isActive('strike') ? 'bg-[#2997ff]/20 text-[#2997ff]' : 'text-white/60'}`}
          title="Strikethrough"
        >
          <Strikethrough size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-2 rounded-lg transition-colors hover:bg-white/10 ${editor.isActive('code') ? 'bg-[#2997ff]/20 text-[#2997ff]' : 'text-white/60'}`}
          title="Inline Code"
        >
          <Code size={16} />
        </button>

        <span className="w-[1px] h-6 bg-white/10 mx-1" />

        {/* Headings */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded-lg transition-colors hover:bg-white/10 ${editor.isActive('heading', { level: 2 }) ? 'bg-[#2997ff]/20 text-[#2997ff]' : 'text-white/60'}`}
          title="Heading 2"
        >
          <Heading2 size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded-lg transition-colors hover:bg-white/10 ${editor.isActive('heading', { level: 3 }) ? 'bg-[#2997ff]/20 text-[#2997ff]' : 'text-white/60'}`}
          title="Heading 3"
        >
          <Heading3 size={16} />
        </button>

        <span className="w-[1px] h-6 bg-white/10 mx-1" />

        {/* Lists */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-lg transition-colors hover:bg-white/10 ${editor.isActive('bulletList') ? 'bg-[#2997ff]/20 text-[#2997ff]' : 'text-white/60'}`}
          title="Bullet List"
        >
          <List size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-lg transition-colors hover:bg-white/10 ${editor.isActive('orderedList') ? 'bg-[#2997ff]/20 text-[#2997ff]' : 'text-white/60'}`}
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded-lg transition-colors hover:bg-white/10 ${editor.isActive('blockquote') ? 'bg-[#2997ff]/20 text-[#2997ff]' : 'text-white/60'}`}
          title="Blockquote"
        >
          <Quote size={16} />
        </button>

        <span className="w-[1px] h-6 bg-white/10 mx-1" />

        {/* Interactive Additions */}
        <button
          type="button"
          onClick={addLink}
          className={`p-2 rounded-lg transition-colors hover:bg-white/10 ${editor.isActive('link') ? 'bg-[#2997ff]/20 text-[#2997ff]' : 'text-white/60'}`}
          title="Insert Link"
        >
          <LinkIcon size={16} />
        </button>

        <button
          type="button"
          onClick={addImage}
          className="p-2 rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          title="Insert Image URL"
        >
          <ImageIcon size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
          className="p-2 rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          title="Clear Formatting"
        >
          <RemoveFormatting size={16} />
        </button>

        <span className="w-[1px] h-6 bg-white/10 mx-1 ml-auto" />

        {/* Undo/Redo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 rounded-lg text-white/60 transition-colors hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
          title="Undo"
        >
          <Undo size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 rounded-lg text-white/60 transition-colors hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
          title="Redo"
        >
          <Redo size={16} />
        </button>
      </div>

      {/* Editor Content Area */}
      <EditorContent editor={editor} className="bg-transparent" />
    </div>
  );
}
