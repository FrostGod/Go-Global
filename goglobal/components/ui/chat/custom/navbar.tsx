import Link from "next/link";

// import { auth, signOut } from "@/app/(auth)/auth";

import { ThemeToggle } from "./theme-toggle";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { AgentSelector } from "./agent-selector";

export const Navbar = async () => {
  // let session = await auth();

  return (
    <>
      <div className="bg-background absolute top-0 left-0 w-dvw py-2 px-3 justify-between flex flex-row items-center z-30">
        <div className="flex flex-row gap-3 items-center">
          { <AgentSelector/> }
          <div className="flex flex-row gap-2 items-center">
            <div className="text-sm dark:text-zinc-300">Agent - U.S</div>
          </div>
        </div>

        {(
          <Button className="py-1.5 px-2 h-fit font-normal" asChild>
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </>
  );
};
