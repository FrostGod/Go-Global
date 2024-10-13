'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { createClient } from '@/utils/supabase/client'

interface CompanyProfile {
  id: number;
  company_name: string;
  company_description: string;
  company_website: string;
  company_product_line: string;
}

function CompanyProfileDisplay({ profile, onEdit }: { profile: CompanyProfile; onEdit: () => void }) {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{profile.company_name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="w-full h-48 relative mb-4">
          <Image 
            src="/images/kindo_logo.png"
            alt={`${profile.company_name} logo`}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <p><strong>Description:</strong> {profile.company_description}</p>
        <p><strong>Website:</strong> <a href={profile.company_website} target="_blank" rel="noopener noreferrer">{profile.company_website}</a></p>
        <p><strong>Product Line:</strong> {profile.company_product_line}</p>
        <Button onClick={onEdit}>Edit Profile</Button>
      </CardContent>
    </Card>
  )
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<CompanyProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<CompanyProfile>({
    id: 0,
    company_name: '',
    company_description: '',
    company_website: '',
    company_product_line: '',
  })

  const supabase = createClient()

  useEffect(() => {
    fetchProfile()
  }, [])

  async function fetchProfile() {
    const { data, error } = await supabase
      .from('company_profiles')
      .select('*')
      .single()

    if (error) {
      console.error('Error fetching profile:', error)
    } else if (data) {
      setProfile(data)
      setFormData(data)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const { data, error } = profile
        ? await supabase
            .from('company_profiles')
            .update(formData)
            .eq('id', profile.id)
            .select()
        : await supabase
            .from('company_profiles')
            .insert([formData])
            .select()

      if (error) throw error

      alert('Profile saved successfully!')
      setProfile(data[0])
      setIsEditing(false)
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('An error occurred while saving the profile. Please try again.')
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
            <Link href="/expo">Expo</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/profile" className="font-bold">Profile</Link>
          </div>
        </nav>
      </header>
      
      <main className="flex-grow container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Enterprise Profile</h1>
        {profile && !isEditing ? (
          <CompanyProfileDisplay profile={profile} onEdit={() => setIsEditing(true)} />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
            <div>
              <label htmlFor="company_name" className="block mb-1">Company Name</label>
              <Input
                id="company_name"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="company_description" className="block mb-1">Company Description</label>
              <Textarea
                id="company_description"
                name="company_description"
                value={formData.company_description}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="company_website" className="block mb-1">Company Website</label>
              <Input
                id="company_website"
                name="company_website"
                type="url"
                value={formData.company_website}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="company_product_line" className="block mb-1">Company Product Line</label>
              <Input
                id="company_product_line"
                name="company_product_line"
                value={formData.company_product_line}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit">Save Profile</Button>
            {isEditing && (
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)} className="ml-2">
                Cancel
              </Button>
            )}
          </form>
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
