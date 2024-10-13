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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-4">
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
        </div>
      </header>
      
      <main className="flex-grow container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Expo</h1>
          <Button onClick={() => setShowForm(true)}>List My Company</Button>
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

        <div className="space-y-6">
          {companies.map((company) => (
            <Card key={company.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 p-6">
                  <div className="w-full h-48 relative mb-4">
                    {company.image_url && company.image_url.startsWith('http') ? (
                      <img 
                        src={company.image_url}
                        alt={`${company.name} logo`}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <Image 
                        src={company.image_url || '/images/placeholder.png'}
                        alt={`${company.name} logo`}
                        layout="fill"
                        objectFit="contain"
                      />
                    )}
                  </div>
                </div>
                <div className="w-full md:w-2/3 p-6">
                  <CardHeader>
                    <CardTitle className="text-2xl">{company.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{company.description}</p>
                    <p className="mb-2"><strong>Expansion Locations:</strong> {company.expansion_locations.join(', ')}</p>
                    <p className="mb-2"><strong>Objective:</strong> {company.objective}</p>
                    <p><strong>Potential Partners:</strong> {company.potential_interests}</p>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
      
      <footer className="bg-white border-t">
        <div className="container mx-auto py-4 text-center">
          <p className="text-sm text-gray-600">© 2024 GoGlobal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
