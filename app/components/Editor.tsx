"use client";

import { uploadFiles } from "@/app/lib/uploadthing";
import EditorJS from "@editorjs/editorjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { toast } from "./ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { PostCreationRequest, PostValidator } from "@/app/lib/validators/post";
import { ZodError } from "zod";

export const Editor = () => {
  const ref = useRef<EditorJS | null>();
  const [isMounted, setIsMounted] = useState(false);
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [cat, setCat] = useState("");

  const initializedEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const inlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          LinkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  if (!file) {
                    return { success: 0, file: { url: null } };
                  }
                  const res = await uploadFiles({
                    files: [file],
                    endpoint: "imageUploader",
                  });
                  return {
                    success: 1,
                    file: {
                      url: res[0].url,
                    },
                  };
                },
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: inlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      initializedEditor();
      setTimeout(() => {
        _titleRef.current?.focus();
      }, 0);
    }

    return () => {
      if (ref.current) {
        ref.current.destroy();
        ref.current = null;
      }
    };
  }, [isMounted, initializedEditor]);

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const { mutate: createPost, isPending } = useMutation({
    mutationFn: async (payload: PostCreationRequest) => {
      const { data } = await axios.post("/api/posts", payload);
      return data;
    },
    onError: () => {
      return toast({
        title: "Something went wrong",
        description: "Comment not posted",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Done",
        description: "Post Created Successfully",
        variant: "default",
      });
      router.push("/");
    },
  });

  const validatePostData = async (inputs: unknown) => {
    try {
      const isValidData = PostValidator.parse(inputs);
      return isValidData;
    } catch (error) {
      if (error instanceof ZodError) {
        if (Object.keys(error.errors).length) {
          for (const [_key, value] of Object.entries(error.errors)) {
            throw new Error((value as { message: string }).message);
          }
        }
      }
      throw error;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const blocks = await ref.current?.save();
    const payload = {
      title: title,
      content: blocks,
      slug: slugify(title),
      catSlug: cat,
    };
    try {
      const validatedPostData = await validatePostData(payload);
      createPost(validatedPostData);
    } catch (error) {
      toast({
        title: "Error",
        description: `${error}`,
        variant: "destructive",
      });
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full text-white ">
      <form
        id="subreddit-post-form"
        className="w-full flex flex-col gap-5 pb-10"
        onSubmit={handleSubmit}
      >
        <div className=" flex flex-col gap-0 bg-neutral-700 ">
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full text-center pt-5 resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          />
          <input
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            placeholder="Category"
            className="w-full text-center overflow-hidden bg-transparent text-2xl font-bold focus:outline-none"
          />
          <div
            id="editor"
            className="min-h-[500px] w-full bg-transparent"
          ></div>
        </div>
        <button className="text-white bg-black py-4 w-full">
          {isPending ? "uploading" : "POST"}
        </button>
      </form>
    </div>
  );
};
