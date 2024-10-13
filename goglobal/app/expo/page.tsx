'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from '@/utils/supabase/client'
import AddCompanyForm from '@/components/add-company-form'

// Type definition for the company object
interface Company {
  id: number;
  image_url: string;
  name: string;
  description: string;
  expansion_locations: string[];
  objective: string;
  potential_interests: string;
}

export default function ExpoPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [showForm, setShowForm] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchCompanies()
  }, [])

  async function fetchCompanies() {
    try {
      const { data, error } = await supabase
        .from('expansion_info')
        .select('*')
      if (error) {
        console.error('Error fetching companies:', error)
        alert(`Error fetching companies: ${error.message}`)
      } else {
        setCompanies(data as Company[])
      }
    } catch (error) {
      console.error('Unexpected error fetching companies:', error)
      alert('An unexpected error occurred while fetching companies. Please try again.')
    }
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
            <Link href="/expo" className="font-bold">Expo</Link>
            <Link href="/pricing">Pricing</Link>
          </div>
        </nav>
      </header>
      
      <main className="flex-grow container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Expansion Expo</h1>
          <Button onClick={() => setShowForm(true)}>Add New Company</Button>
        </div>
        
        {showForm && (
          <AddCompanyForm
            onClose={() => setShowForm(false)}
            onSubmit={() => {
              setShowForm(false)
              fetchCompanies()
            }}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <Card key={company.id} className="flex flex-col">
              <CardHeader>
                <div className="w-full h-48 relative mb-4">
                  <Image 
                    src={company.image_url || '/images/placeholder.png'} 
                    alt={`${company.name} logo`}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <CardTitle>{company.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">{company.description}</p>
                <p className="text-sm"><strong>Expansion Locations:</strong> {company.expansion_locations.join(', ')}</p>
                <p className="text-sm"><strong>Objective:</strong> {company.objective}</p>
                <p className="text-sm"><strong>Potential Partners:</strong> {company.potential_interests}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      
      <footer className="bg-gray-100">
        <div className="container mx-auto py-4 text-center">
          <p className="text-sm text-gray-600">© 2024 GoGlobal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
