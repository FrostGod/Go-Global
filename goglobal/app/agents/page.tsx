// app/agents/[agentId]/chat.tsx
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/ui/chat/custom/navbar';
import { Chat } from '@/components/ui/chat/custom/chat'; // Adjust path as needed

export default function AgentChat() {
//   const params = useParams();
//   const agentId = params.agentId as string; // Type assertion for safety

  // ... use agentId to fetch initial messages or other data ...

  return(

    <html lang="en">
    <body className="antialiased">

        <Navbar />
        <Chat id={"agentId"} initialMessages={[]} />
    </body>
  </html>

);
}

