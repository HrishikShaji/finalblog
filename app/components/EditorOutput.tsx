"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  {
    ssr: false,
  },
);

interface EditorProps {
  content: any;
}

const style = {
  paragraph: {
    fontsize: "0.875rem",
    lineHeight: "1.25rem",
  },
};

const renderers = {
  image: CustonImageRenderer,
  code: CustomCodeRenderer,
};

export const EditorOutput: React.FC<EditorProps> = ({ content }) => {
  return (
    <Output
      style={style}
      data={content}
      className="text-sm"
      renderers={renderers}
    />
  );
};

function CustomCodeRenderer({ data }: any) {
  return (
    <pre className="bg-gray-800 rounded-md p-4">
      <code className="text-gray-100 text-sm">{data.code}</code>
    </pre>
  );
}

function CustonImageRenderer({ data }: any) {
  const src = data.file.url;
  return (
    <div className=" h-full w-full relative">
      <Image
        alt="image"
        className="object-cover h-full w-full"
        height={1000}
        width={1000}
        src={src}
      />
    </div>
  );
}
