
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
import { createContext, useState, useContext } from 'react';


export const Navbar = ({} : {agentSelected: boolean, agentName: String | undefined}) => {
  // let session = await auth();

  const [agentSelected, setSharedAgent] = useState(false);
  const [agentName, setSharedAgentName] = useState("");

  const handleChange = (newValue : string ): void => {
    setSharedAgentName(newValue);
    setSharedAgent(true);
  };

  return (
    <>
      <div className="bg-background absolute top-0 left-0 w-dvw py-2 px-3 justify-between flex flex-row items-center z-30">
        <div className="flex flex-row gap-3 items-center">
          { <AgentSelector OnAgentChange={handleChange}/> }
          <div className="flex flex-row gap-2 items-center">
            { agentSelected ? <div> Chatting with Agent {agentName}</div>: <div className="text-sm dark:text-zinc-300">Select an Agent to Chat with!</div>  }
          </div>
        </div>
      </div>
    </>
  );
};
