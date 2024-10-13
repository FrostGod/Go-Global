'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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

        <Table>
          <TableCaption>List of companies and their expansion plans</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Company ID</TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead>Company Description</TableHead>
              <TableHead>Expansion Locations</TableHead>
              <TableHead>Objective</TableHead>
              <TableHead>Potential Partners</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.id}</TableCell>
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell>{company.description}</TableCell>
                <TableCell>{company.expansion_locations.join(', ')}</TableCell>
                <TableCell>{company.objective}</TableCell>
                <TableCell>{company.potential_interests}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
      
      <footer className="bg-gray-100">
        <div className="container mx-auto py-4 text-center">
          <p className="text-sm text-gray-600">© 2024 GoGlobal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
