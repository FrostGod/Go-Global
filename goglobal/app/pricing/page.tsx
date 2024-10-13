import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="container mx-auto py-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/image.png" 
              alt="GoGlobal Logo" 
              width={40} 
              height={40} 
              className="mr-2"
            />
            <span className="text-xl font-bold">GoGlobal</span>
          </Link>
          <div className="space-x-4">
            <Link href="/agents">Agents</Link>
            <Link href="/expo">Expo</Link>
            <Link href="/pricing" className="font-bold">Pricing</Link>
          </div>
        </nav>
      </header>
      
      <main className="flex-grow container mx-auto py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Simple, Transparent Pricing</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Free for Hackathon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold mb-4">$0 <span className="text-sm font-normal">for 15 days</span></p>
              <ul className="space-y-2">
                <li>✅ Full access to all features</li>
                <li>✅ AI-powered expansion strategies</li>
                <li>✅ Intelligent lead generation</li>
                <li>✅ Customer management tools</li>
                <li>✅ 24/7 AI support</li>
              </ul>
              <Button className="w-full mt-6">Get Started</Button>
            </CardContent>
          </Card>
          
          <Card className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Enterprise</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold mb-4">Custom Pricing</p>
              <ul className="space-y-2">
                <li>✅ All features from Free plan</li>
                <li>✅ Dedicated account manager</li>
                <li>✅ Custom AI model training</li>
                <li>✅ Advanced analytics and reporting</li>
                <li>✅ API access for integrations</li>
                <li>✅ 24/7 priority support</li>
              </ul>
              <Button className="w-full mt-6">Contact Sales</Button>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <footer className="bg-gray-100 mt-16">
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
