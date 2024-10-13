import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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
    <form onSubmit={handleSubmit} className="space-y-4 mb-8 p-4 border rounded-lg">
      <Input name="name" placeholder="Company Name" onChange={handleChange} required />
      <Textarea name="description" placeholder="Company Description" onChange={handleChange} required />
      <Input name="expansion_locations" placeholder="Expansion Locations (comma-separated)" onChange={handleChange} required />
      <Input name="objective" placeholder="Objective" onChange={handleChange} required />
      <Input name="potential_interests" placeholder="Potential Interests" onChange={handleChange} required />
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit">Add Company</Button>
      </div>
    </form>
  )
}
