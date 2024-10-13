import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BackgroundPattern } from '@/components/background-pattern'
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <BackgroundPattern />
      <header className="container mx-auto py-4">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <Image 
              src="/images/image.png" 
              alt="GoGlobal Logo" 
              width={40} 
              height={40} 
              className="mr-2"
            />
            <span className="text-xl font-bold">GoGlobal</span>
          </div>
          <div className="space-x-4">
            <Link href="/agents">Agents</Link>
            <Link href="/expo">Expo</Link>
            <Link href="/pricing">Pricing</Link>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button>Sign Up</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto py-16 text-center">
        <h1 className="text-6xl font-bold mb-6">
          World Agents<br />
          <span className="bg-yellow-200 px-2">Expand Your Business</span>
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          The go to platform to expand your business globally with AI agents.
          we have agents figuring out expansion strategies for you.
          we have agents that can help you find leads and close deals.
          we have agents that can help you manage your customers.
        </p>
        <div className="space-x-4 mb-12">
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="outline">Get a demo</Button>
        </div>
        <div className="relative w-full max-w-4xl mx-auto">
          <Image
            src="/images/llama_agents.jpeg"
            alt="GoGlobal Platform Preview"
            width={1200}
            height={675}
            className="rounded-lg shadow-2xl"
          />
        </div>
      </main>
      <footer className="bg-gray-100">
        <div className="container mx-auto py-8 flex justify-between">
          <div>
            <h3 className="font-bold mb-2">GoGlobal</h3>
            <p className="text-sm text-gray-600">© 2024 GoGlobal. All rights reserved.</p>
          </div>
          <div className="space-x-4">
            <Link href="/privacy" className="text-sm text-gray-600">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-gray-600">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
