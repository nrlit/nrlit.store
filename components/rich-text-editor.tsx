"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import CodeBlock from "@tiptap/extension-code-block";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Image,
      BulletList,
      OrderedList,
      ListItem,
      Heading.configure({ levels: [1, 2, 3] }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      CodeBlock,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      TextStyle,
      Color,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const previousValue = useRef(value); // Ref to track previous value
  const previousSelection = useRef(editor?.state.selection); // Ref to store selection

  useEffect(() => {
    if (editor) {
      // Only set content if value has changed to prevent infinite loops
      if (previousValue.current !== value) {
        previousSelection.current = editor.state.selection; // Save the selection
        editor.commands.setContent(value); // Set the new content
        previousValue.current = value; // Update the ref with the new value
      }
    }
  }, [value, editor]); // This effect runs only when value changes

  useEffect(() => {
    if (editor && previousSelection.current) {
      // Restores the cursor position after content change
      editor.commands.setTextSelection(previousSelection.current);
    }
  }, [editor]); // Run this effect only after editor is initialized

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="border rounded-lg p-2 space-y-2">
      {/* Toolbar */}
      <div className="flex gap-2 flex-wrap border-b pb-2">
        <Button
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </Button>
        <Button
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </Button>
        <Button
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          Underline
        </Button>
        <Button
          size="sm"
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </Button>
        <Button
          size="sm"
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </Button>
        <Button
          size="sm"
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </Button>
        <Button
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          Bullet List
        </Button>
        <Button
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          Numbered List
        </Button>
        <Button
          size="sm"
          type="button"
          onClick={() => {
            const url = prompt("Enter URL:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          Link
        </Button>
        <Button
          size="sm"
          type="button"
          onClick={() => {
            const url = prompt("Enter Image URL:");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
        >
          Image
        </Button>
        <Button
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          Code Block
        </Button>
        <Button
          size="sm"
          type="button"
          onClick={() =>
            editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run()
          }
        >
          Insert Table
        </Button>
        <Button
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().addRowAfter().run()}
        >
          + Row
        </Button>
        <Button
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().addColumnAfter().run()}
        >
          + Column
        </Button>
        <Button
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().deleteTable().run()}
        >
          Remove Table
        </Button>
      </div>

      {/* Color Picker */}
      <div className="flex items-center space-x-2 mt-2">
        <span>Text Color:</span>
        <Input
          type="color"
          className="w-10 h-10 p-0 border-none"
          onChange={(e) =>
            editor.chain().focus().setColor(e.target.value).run()
          }
        />
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="min-h-[150px] border rounded-md p-2 prose dark:prose-invert"
      />
    </div>
  );
}
