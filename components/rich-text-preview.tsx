import "./style-for-rich-text/tiptap.scss";

export function RichTextPreview({ content }: { content: string }) {
  return (
    <div className="prose dark:prose-invert mt-4">
      <div
        className="max-w-full"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
