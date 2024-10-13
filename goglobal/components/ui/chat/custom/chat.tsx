"use client";

import { Attachment, Message, ChatRequestOptions, CreateMessage } from "ai";
import { useState } from "react";
import axios from 'axios';
import { TransparentLoader } from '@/components/ui/chat/custom/LoadIcon';
import { toast } from 'react-hot-toast'; // Add this import if you're using react-hot-toast for notifications

import { Message as PreviewMessage } from "@/components/ui/chat/custom/message";
import { useScrollToBottom } from "@/components/ui/chat/custom/use-scroll-to-bottom";

import { MultimodalInput } from "./multimodal-input";
import { Overview } from "./overview";

const appendMessage = async (message: Message | CreateMessage, chatRequestOptions?: ChatRequestOptions) => {
  // Implement your append logic here
  return null;
};

export function Chat({
  id,
  initialMessages,
}: {
  id: string;
  initialMessages: Array<Message>;
}) {
  const [messages, setMessages] = useState<Array<Message>>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  const [attachments, setAttachments] = useState<Array<Attachment>>([]);

  const handleSubmit = (
    event?: { preventDefault?: () => void } | undefined,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => {
    if (event?.preventDefault) event.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    axios.post('http://127.0.0.1:8000/api/chat', {
      message: input,
      attachments: attachments,
    }, {
      headers: {
        //'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Content-Type': 'application/json',
      },
      withCredentials: true, // This is needed if you're using cookies for authentication
    })
      .then(response => {
        console.log(response.data)
        const aiMessage: Message = { 
          id: Date.now().toString(),
          role: "assistant", 
          content: response.data.message 
        };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      })
      .catch(error => {
        console.error('Error sending message:', error);
        let errorMessage = "Sorry, there was an error processing your request.";
        if (error.code === 'ERR_NETWORK') {
          errorMessage = "Network error. Please check if the server is running and accessible.";
          console.log("Server URL:", 'http://127.0.0.1:8000/api/chat');
          console.log("Is the server running on this address and port?");
        } else if (error.response) {
          errorMessage = `Server error: ${error.response.status}`;
        }
        toast.error(errorMessage);
        const errorAiMessage: Message = { 
          id: Date.now().toString(),
          role: "assistant", 
          content: errorMessage 
        };
        setMessages((prevMessages) => [...prevMessages, errorAiMessage]);
      })
      .finally(() => {
        setIsLoading(false);
        setAttachments([]);
      });
  };

  const stop = () => {
    // Implement stop functionality if needed
  };

  return (
    <div className="flex flex-row justify-center pb-4 md:pb-8 h-dvh bg-background">
      <div className="flex flex-col justify-between items-center gap-4">
        <div
          ref={messagesContainerRef}
          className="flex flex-col gap-4 h-full w-dvw items-center overflow-y-scroll"
        >
          {messages.length === 0 && <Overview />}

          {messages.map((message, index) => (
            <PreviewMessage
              key={`${id}-${index}`}
              role={message.role}
              content={message.content}
              attachments={message.experimental_attachments}
              toolInvocations={message.toolInvocations}
            />
          ))}
          <div
            ref={messagesEndRef}
            className="shrink-0 min-w-[24px] min-h-[24px]"
          />
        </div>

        <div>
        {isLoading ? (
                        <TransparentLoader/>
              ) : null}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-row gap-2 relative items-end w-full md:max-w-[500px] max-w-[calc(100dvw-32px)] px-4 md:px-0">
          <MultimodalInput
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            stop={stop}
            attachments={attachments}
            setAttachments={setAttachments}
            messages={messages}
            append={appendMessage}
          />
        </form>
      </div>
    </div>
  );
}
