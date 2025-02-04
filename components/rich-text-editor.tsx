"use client";

import "./style-for-rich-text/tiptap.scss";
import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Code from "@tiptap/extension-code";
import Image from "@tiptap/extension-image";
import Dropcursor from "@tiptap/extension-dropcursor";
import Link from "@tiptap/extension-link";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import History from "@tiptap/extension-history";
import Focus from "@tiptap/extension-focus";
import Gapcursor from "@tiptap/extension-gapcursor";
import TextAlign from "@tiptap/extension-text-align";
import HardBreak from "@tiptap/extension-hard-break";
import Youtube from "@tiptap/extension-youtube";
import Typography from "@tiptap/extension-typography";
import { Button } from "./ui/button";
import { useCallback, useState } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [height, setHeight] = useState(480);
  const [width, setWidth] = useState(640);

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Strike,
      Youtube.configure({
        controls: false,
        nocookie: true,
      }),
      Underline,
      Typography,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Code,
      BulletList,
      ListItem,
      Image,
      HorizontalRule,
      Dropcursor,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            // disallowed protocols
            const disallowedProtocols = ["ftp", "file", "mailto"];
            const protocol = parsedUrl.protocol.replace(":", "");

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === "string" ? p : p.scheme
            );

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            // disallowed domains
            const disallowedDomains = [
              "example-phishing.com",
              "malicious-site.net",
            ];
            const domain = parsedUrl.hostname;

            if (disallowedDomains.includes(domain)) {
              return false;
            }

            // all checks have passed
            return true;
          } catch {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`https://${url}`);

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = [
              "example-no-autolink.com",
              "another-no-autolink.com",
            ];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),
      TextStyle,
      HardBreak,
      Color,
      History,
      Focus.configure({
        className: "has-focus",
        mode: "all",
      }),
      Gapcursor,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href || "";
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    try {
      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  }, [editor]);

  if (!editor) {
    return <div>Loading editor...</div>;
  } else {
    editor.setEditable(true);
  }

  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL");

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, parseInt(width.toString(), 10)) || 640,
        height: Math.max(180, parseInt(height.toString(), 10)) || 480,
      });
    }
  };

  return (
    <>
      <div className="control-group space-y-2">
        <div className="button-group space-x-2 flex flex-row items-center">
          <Button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            B
          </Button>
          <Button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            I
          </Button>
          <Button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            S
          </Button>
          <Button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? "is-active" : ""}
          >
            U
          </Button>
          <Button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            H1
          </Button>
          <Button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            H2
          </Button>
          <Button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "is-active" : ""
            }
          >
            H3
          </Button>
          <Button
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            Hr
          </Button>
          <Button
            type="button"
            onClick={() => editor.chain().focus().setHardBreak().run()}
          >
            Br
          </Button>
          <Button
            type="button"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={editor.isActive("code") ? "is-active" : ""}
          >
            Code
          </Button>
          <Button
            type="button"
            onClick={setLink}
            className={editor.isActive("link") ? "is-active" : ""}
          >
            Link
          </Button>
          <Button type="button" onClick={addImage}>
            Image
          </Button>
          <Button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            Bullet
          </Button>
          <Button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            Undo
          </Button>
          <Button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            Redo
          </Button>
        </div>
        <div className="button-group space-x-2 flex flex-row items-center">
          <Button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={
              editor.isActive({ textAlign: "left" }) ? "is-active" : ""
            }
          >
            Left
          </Button>
          <Button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={
              editor.isActive({ textAlign: "center" }) ? "is-active" : ""
            }
          >
            Center
          </Button>
          <Button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={
              editor.isActive({ textAlign: "right" }) ? "is-active" : ""
            }
          >
            Right
          </Button>
          <Button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={
              editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
            }
          >
            Justify
          </Button>
          <Button
            type="button"
            onClick={() => editor.chain().focus().unsetTextAlign().run()}
          >
            Unset text align
          </Button>
          <Button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={editor.isActive({ level: 1 }) ? "is-active" : ""}
          >
            H1
          </Button>
          <Button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={editor.isActive({ level: 2 }) ? "is-active" : ""}
          >
            H2
          </Button>
          <Button type="button" id="add" onClick={addYoutubeVideo}>
            Add YouTube video
          </Button>
          <input
            id="width"
            type="number"
            min="320"
            max="1920"
            placeholder="width"
            value={width}
            onChange={(event) => setWidth(Number(event.target.value))}
          />
          <input
            id="height"
            type="number"
            min="180"
            max="1080"
            placeholder="height"
            value={height}
            onChange={(event) => setHeight(Number(event.target.value))}
          />
        </div>
        <div className="button-group space-x-2 flex flex-row items-center">
          <input
            type="color"
            onInput={(event) =>
              editor
                .chain()
                .focus()
                .setColor((event.target as HTMLInputElement).value)
                .run()
            }
            value={editor.getAttributes("textStyle").color}
            data-testid="setColor"
            className="w-9 h-9 rounded-md border-none cursor-pointer"
          />
          <Button
            type="button"
            onClick={() => editor.chain().focus().setColor("#958DF1").run()}
            className={
              editor.isActive("textStyle", { color: "#958DF1" })
                ? "is-active"
                : ""
            }
            data-testid="setPurple"
          >
            Purple
          </Button>
          <Button
            type="button"
            onClick={() => editor.chain().focus().setColor("#F98181").run()}
            className={
              editor.isActive("textStyle", { color: "#F98181" })
                ? "is-active"
                : ""
            }
            data-testid="setRed"
          >
            Red
          </Button>
          <Button
            type="button"
            onClick={() => editor.chain().focus().setColor("#FBBC88").run()}
            className={
              editor.isActive("textStyle", { color: "#FBBC88" })
                ? "is-active"
                : ""
            }
            data-testid="setOrange"
          >
            Orange
          </Button>
          <Button
            type="button"
            onClick={() => editor.chain().focus().setColor("#FAF594").run()}
            className={
              editor.isActive("textStyle", { color: "#FAF594" })
                ? "is-active"
                : ""
            }
            data-testid="setYellow"
          >
            Yellow
          </Button>
          <Button
            type="button"
            onClick={() => editor.chain().focus().setColor("#70CFF8").run()}
            className={
              editor.isActive("textStyle", { color: "#70CFF8" })
                ? "is-active"
                : ""
            }
            data-testid="setBlue"
          >
            Blue
          </Button>
          <Button
            type="button"
            onClick={() => editor.chain().focus().setColor("#94FADB").run()}
            className={
              editor.isActive("textStyle", { color: "#94FADB" })
                ? "is-active"
                : ""
            }
            data-testid="setTeal"
          >
            Teal
          </Button>
          <Button
            type="button"
            onClick={() => editor.chain().focus().setColor("#B9F18D").run()}
            className={
              editor.isActive("textStyle", { color: "#B9F18D" })
                ? "is-active"
                : ""
            }
            data-testid="setGreen"
          >
            Green
          </Button>
          <Button
            type="button"
            onClick={() => editor.chain().focus().unsetColor().run()}
            data-testid="unsetColor"
          >
            Unset color
          </Button>
        </div>
      </div>

      <EditorContent
        editor={editor}
        className="min-h-[150px] border rounded-md p-2 prose dark:prose-invert"
      />
    </>
  );
}
