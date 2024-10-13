import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { createClient } from '@/utils/supabase/client'

interface FormData {
  name: string;
  description: string;
  expansion_locations: string;
  objective: string;
  potential_interests: string;
}

interface AddCompanyFormProps {
  onClose: () => void;
  onSubmit: () => void;
}

export default function AddCompanyForm({ onClose, onSubmit }: AddCompanyFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    expansion_locations: '',
    objective: '',
    potential_interests: '',
  })
  const supabase = createClient()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Submitting form data:', formData)
    try {
      const randomId = Math.floor(Math.random() * 1000000) + 1

      const response = await fetch('/api/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: randomId,
          ...formData,
          expansion_locations: formData.expansion_locations.split(',').map(loc => loc.trim()),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'An error occurred while adding the company.');
      }

      console.log('Company added successfully:', result.data);
      onSubmit();
    } catch (error) {
      console.error('Error adding company:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while adding the company. Please try again.';
      alert(errorMessage);
    }
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>List Your Company</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <Input id="name" name="name" placeholder="Enter company name" onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Company Description</label>
            <Textarea id="description" name="description" placeholder="Describe your company" onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="expansion_locations" className="block text-sm font-medium text-gray-700 mb-1">Expansion Locations</label>
            <Input id="expansion_locations" name="expansion_locations" placeholder="Enter locations (comma-separated)" onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="objective" className="block text-sm font-medium text-gray-700 mb-1">Objective</label>
            <Input id="objective" name="objective" placeholder="Enter your objective" onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="potential_interests" className="block text-sm font-medium text-gray-700 mb-1">Potential Interests</label>
            <Input id="potential_interests" name="potential_interests" placeholder="Enter potential interests" onChange={handleChange} required />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">List My Company</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
