import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  // Sample location data
  const locations = [
    {
      location: "New York City",
      description: "The most populous city in the United States, known for its iconic skyline and diverse culture.",
    },
    {
      location: "Tokyo",
      description: "The capital of Japan, a bustling metropolis that blends ultra-modern and traditional aspects.",
    },
    {
      location: "Paris",
      description: "The capital of France, renowned for its art, fashion, gastronomy, and romantic atmosphere.",
    },
    {
      location: "London",
      description: "The capital of England and the United Kingdom, a global city with a rich history and diverse population.",
    },
    {
      location: "Sydney",
      description: "The largest city in Australia, famous for its harbor, opera house, and beautiful beaches.",
    },
    {
      location: "Rio de Janeiro",
      description: "A vibrant Brazilian city known for its stunning beaches, carnival celebrations, and Christ the Redeemer statue.",
    },
  ]
  interface Location {
    location: string;
    description: string;
  }
  
  interface LocationTableProps {
    content: Location[] | null ;
  }
  
  export function LocationTable({ content }: LocationTableProps) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Location Descriptions</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Location</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {Array.isArray(content) && content.length > 0 ? (
          content.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.location}</TableCell>
              <TableCell>{item.description}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={2} className="text-center">No content available</TableCell>
          </TableRow>
        )}
          </TableBody>
        </Table>
      </div>
    )
  }