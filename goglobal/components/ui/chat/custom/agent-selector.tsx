
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import cx from "classnames";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { toast } from "sonner";
import Image from 'next/image'; // If using Next.js's Image
import useSWR from "swr";

// import { Chat } from "@/db/schema";
// import { fetcher } from "@/lib/utils";

import {
  InfoIcon,
  MenuIcon,
  MoreHorizontalIcon,
  PencilEditIcon,
  TrashIcon,
} from "./icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";


interface Agent {
  id: string;
  label: string;
  llama: string;
  // ... other properties if needed
}

// Example usage:
const agents: Agent[] = [
  { id: '1', label: 'US', llama: "llama_us" },
  { id: '2', label: 'China', llama: "llama_china"},
  { id: '3', label: 'India', llama: "llama_india" },
];

export const AgentSelector = ({ OnAgentChange}: { OnAgentChange: (agent: string) => void }) => {
  const { id } = useParams();
  const pathname = usePathname();

  const [isHistoryVisible, setAgentSelectorVisible] = useState(false);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        className="p-1.5 h-fit"
        onClick={() => {
          setAgentSelectorVisible(true);
        }}
      >
        <MenuIcon />
      </Button>

      <Sheet
        open={isHistoryVisible}
        onOpenChange={(state) => {
          setAgentSelectorVisible(state);
        }}
      >
        <SheetContent side="left" className="p-3 w-80 bg-muted">
          <SheetHeader>
            <VisuallyHidden.Root>
              <SheetTitle className="text-left">Agent Selector</SheetTitle>
              <SheetDescription className="text-left">
                {/* {history === undefined ? "loading" : history.length} chats */}
              </SheetDescription>
            </VisuallyHidden.Root>
          </SheetHeader>

          <div className="text-sm flex flex-row items-center justify-between">
            <div className="flex flex-row gap-2">
              <div className="dark:text-zinc-300">Agent Selector</div>

              <div className="dark:text-zinc-400 text-zinc-500">
                {/* {history === undefined ? "loading" : history.length} chats */}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
        {agents.map((agent: Agent) => (
        <button
          key={agent.id}
          onClick={async () => {
            OnAgentChange(agent.label);
            setAgentSelectorVisible(false);
          }} // Call callback with item ID
          className="m-4 bg-white-500 text-black rounded-md" // Add styling
        >
                      <div className="flex items-center justify-center">  {/* Added a div */}

          <Image src={"/images/" + agent.llama + ".jpeg"} alt="Expansion Strategy" width={200} height={100} className="rounded-lg" />
          </div>
          <span>{agent.label}</span>

        </button>
      ))}
    </div>


        </SheetContent>
      </Sheet>

    </>
  );
};
