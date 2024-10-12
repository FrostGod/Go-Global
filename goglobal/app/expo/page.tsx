import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for the table
const companies = [
  { 
    Company_ID: 1, 
    Logo: "/images/company1.png", 
    Company_Name: "TechCorp", 
    Company_Description: "Innovative software solutions", 
    Expansion_Locations: "Europe, Asia",
    Objective: "Seeking local talent and marketing partnerships",
    Potential_Partners: "Tech recruiters, Digital marketing agencies"
  },
  { 
    Company_ID: 2, 
    Logo: "/images/company2.png", 
    Company_Name: "GreenEnergy", 
    Company_Description: "Sustainable energy tech", 
    Expansion_Locations: "South America, Africa",
    Objective: "Looking for local distributors and government contacts",
    Potential_Partners: "Energy distributors, Government liaison firms"
  },
  { 
    Company_ID: 3, 
    Logo: "/images/company3.png", 
    Company_Name: "HealthTech", 
    Company_Description: "Advanced medical devices", 
    Expansion_Locations: "North America, Australia",
    Objective: "Seeking regulatory experts and healthcare partnerships",
    Potential_Partners: "Medical regulatory consultants, Hospital networks"
  },
]

export default function ExpoPage() {
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
        <h1 className="text-3xl font-bold mb-6">Company Expansion Expo</h1>
        <Table>
          <TableCaption>List of companies and their expansion plans</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Company ID</TableHead>
              <TableHead className="w-[100px]">Logo</TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead>Company Description</TableHead>
              <TableHead>Expansion Locations</TableHead>
              <TableHead>Objective</TableHead>
              <TableHead>Potential Partners</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.Company_ID}>
                <TableCell>{company.Company_ID}</TableCell>
                <TableCell>
                  <Image src={company.Logo} alt={`${company.Company_Name} logo`} width={50} height={50} />
                </TableCell>
                <TableCell className="font-medium">{company.Company_Name}</TableCell>
                <TableCell>{company.Company_Description}</TableCell>
                <TableCell>{company.Expansion_Locations}</TableCell>
                <TableCell>{company.Objective}</TableCell>
                <TableCell>{company.Potential_Partners}</TableCell>
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
