import { FileText } from "lucide-react";
import Image from "next/image";

import { Card, CardHeader } from "@/components/ui/card";

interface FileItemProps {
  filename: string;
  url: string;
}

const isImageFile = (filename: string) => {
  const extensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
  return extensions.some((ext) => filename.toLowerCase().endsWith(ext));
};

const extractNameFromUrl = (url: string) => {
  const parts = url.split("/");
  return parts[parts.length - 1];
};

const FileItem = ({ filename, url }: FileItemProps) => (
  <Card
    className="cursor-pointer shadow-none transition-colors hover:bg-muted/30"
    title={extractNameFromUrl(filename)}
    onClick={() => window.open(url, "_blank")}
  >
    <CardHeader className="flex flex-row items-center gap-2 space-y-0 p-3">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-muted/60">
        {isImageFile(filename) ? (
          <div className="relative h-8 w-8 overflow-hidden rounded">
            <Image src={url} alt={filename} fill className="object-cover" />
          </div>
        ) : (
          <FileText size={16} className="text-muted-foreground" />
        )}
      </div>
      <span className="line-clamp-1 text-sm font-medium">{extractNameFromUrl(filename)}</span>
    </CardHeader>
  </Card>
);

export default FileItem;
