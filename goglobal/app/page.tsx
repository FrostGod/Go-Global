import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BackgroundPattern } from '@/components/background-pattern'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <BackgroundPattern />
      <header className="container mx-auto py-4">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            {/* Placeholder for logo */}
            <div className="w-10 h-10 bg-gray-300 rounded-full mr-2"></div>
            <span className="text-xl font-bold">GoGlobal</span>
          </div>
          <div className="space-x-4">
            <Link href="/agents">Agents</Link>
            <Link href="/docs">Docs</Link>
            <Link href="/pricing">Pricing</Link>
            <Button variant="outline">Get a Demo</Button>
            <Button>Sign Up</Button>
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto py-16 text-center">
        <h1 className="text-6xl font-bold mb-6">
          Open Source<br />
          <span className="bg-yellow-200 px-2">AI Agent Management</span>
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          All-in-one platform to securely manage AI agents and configurations
          across your team and infrastructure.
        </p>
        <div className="space-x-4">
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="outline">Get a demo</Button>
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