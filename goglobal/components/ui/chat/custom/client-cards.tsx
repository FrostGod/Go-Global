import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone } from "lucide-react"

// Sample client data
const clients = [
  {
    client_name: "Acme Corp",
    client_location: "New York, NY",
    client_contact: "+1 (555) 123-4567",
    client_description: "Leading provider of innovative solutions",
  },
  {
    client_name: "TechStar Inc",
    client_location: "San Francisco, CA",
    client_contact: "+1 (555) 987-6543",
    client_description: "Cutting-edge technology company",
  },
  {
    client_name: "Global Services Ltd",
    client_location: "London, UK",
    client_contact: "+44 20 1234 5678",
    client_description: "Worldwide business consulting firm",
  },
  {
    client_name: "EcoGreen Solutions",
    client_location: "Seattle, WA",
    client_contact: "+1 (555) 789-0123",
    client_description: "Sustainable energy and environmental services",
  },
]

// Define the structure of a client object
interface Client {
    client_name: string
    client_location: string
    client_contact: string
    client_description: string
  }
  
// Define the props for the ClientCard component
interface ClientCardProps {
    content: Client[]
  }


  export function ClientCard({ content }: ClientCardProps) {
    if (!content || content.length === 0) {
      return <div className="text-center">No clients found.</div>
    }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Client Directory</h1>
      <div className="flex flex-col space-y-4 max-w-2xl mx-auto">
        {          
        Array.isArray(content) && content.length > 0 ? (
        content.map((client, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center">
                <div className="p-4">
                  <Button variant="outline" size="icon" className="h-14 w-14">
                    <Phone className="h-6 w-6" />
                    <span className="sr-only">Contact {client.client_name}</span>
                  </Button>
                </div>
                <div className="flex-grow p-4 text-right">
                  <h2 className="font-semibold">{client.client_name}</h2>
                  <p className="text-sm text-muted-foreground">{client.client_location}</p>
                  <p className="text-sm">{client.client_contact}</p>
                  <p className="text-sm text-muted-foreground mt-2">{client.client_description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))): <div>No data</div>}
      </div>
    </div>
  )
}