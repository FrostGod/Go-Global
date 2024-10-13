"use client";

import { Attachment, ToolInvocation } from "ai";
import { motion } from "framer-motion";
import { ReactNode } from "react";

import { BotIcon, UserIcon } from "./icons";
import { Markdown } from "./markdown";
import { ClientCard } from "@/components/ui/chat/custom/client-cards";
import { LocationTable } from "@/components/ui/chat/custom/location-table";

import { PreviewAttachment } from "./preview-attachment";

interface Client {
  client_name: string
  client_location: string
  client_contact: string
  client_description: string
}

interface Location {
  location: string
  description: string
}

export const Message = ({
  role,
  content,
  request,
  toolInvocations,
  attachments,
}: {
  role: string;
  request: string;
  content: string | ReactNode | Client[];
  toolInvocations: Array<ToolInvocation> | undefined;
  attachments?: Array<Attachment>;
  format?: string;
}) => {
  return (
    <motion.div
      className={`flex flex-row gap-4 px-4 w-full md:w-[500px] md:px-0 first-of-type:pt-20`}
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="size-[24px] flex flex-col justify-center items-center shrink-0 text-zinc-400">
        {role === "assistant" ? <BotIcon /> : <UserIcon />}
      </div>

      <div className="flex flex-col gap-2 w-full">
      {content && (
          <div className="text-zinc-800 dark:text-zinc-300 flex flex-col gap-4">
            {request === "Client Directory" && Array.isArray(content) && (
              <ClientCard content={content as Client[]} />
            )}
            {request === "Location List" && Array.isArray(content) && (
              <LocationTable content={content as unknown as Location[]} />
            )}
            {request !== "Client Directory" && request !== "Location List" && typeof content === "string" && (
              <Markdown>{content}</Markdown>
            )}
          </div>
        )}
        
        {attachments && (
          <div className="flex flex-row gap-2">
            {attachments.map((attachment) => (
              <PreviewAttachment key={attachment.url} attachment={attachment} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
