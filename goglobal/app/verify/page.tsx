'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface VerificationRequest {
  id: number;
  clientName: string;
  clientLocation: string;
  serviceOffered: string;
  status: 'pending' | 'verified' | 'rejected';
  timestamp: Date;
}

export default function VerifyPage() {
  const [formData, setFormData] = useState({
    clientName: '',
    clientLocation: '',
    serviceOffered: '',
  })

  const [requests, setRequests] = useState<VerificationRequest[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newRequest: VerificationRequest = {
      id: Date.now(),
      ...formData,
      status: 'pending',
      timestamp: new Date(),
    }
    setRequests(prev => [newRequest, ...prev])
    setFormData({ clientName: '', clientLocation: '', serviceOffered: '' })
  }

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
            <Link href="/pricing">Pricing</Link>
            <Link href="/verify" className="font-bold">Verify</Link>
          </div>
        </nav>
      </header>
      
      <main className="flex-grow container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Client Verification</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Submit Verification Request</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="clientName" className="block mb-1">Client Name</label>
                <Input
                  id="clientName"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="clientLocation" className="block mb-1">Client Location</label>
                <Input
                  id="clientLocation"
                  name="clientLocation"
                  value={formData.clientLocation}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="serviceOffered" className="block mb-1">Service Offered</label>
                <Input
                  id="serviceOffered"
                  name="serviceOffered"
                  value={formData.serviceOffered}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit">Submit Request</Button>
            </form>
          </CardContent>
        </Card>
        
        <h2 className="text-2xl font-bold mb-4">Previous Requests</h2>
        {requests.length === 0 ? (
          <p>No verification requests submitted yet.</p>
        ) : (
          <div className="space-y-4">
            {requests.map(request => (
              <Card key={request.id}>
                <CardContent className="flex justify-between items-center">
                  <div>
                    <p><strong>Client:</strong> {request.clientName}</p>
                    <p><strong>Location:</strong> {request.clientLocation}</p>
                    <p><strong>Service:</strong> {request.serviceOffered}</p>
                    <p><strong>Submitted:</strong> {request.timestamp.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full">
                      {request.status}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      
      <footer className="bg-gray-100 mt-auto">
        <div className="container mx-auto py-4 text-center">
          <p className="text-sm text-gray-600">© 2024 GoGlobal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
