"use client"

import { useServices } from "@/hooks/use-cms-content"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { PageHeader } from "@/components/ui/page-header"

export default function ManageServicesPage() {
  const queryClient = useQueryClient()
  const { data: services, isLoading, error } = useServices()

  const deleteServiceMutation = useMutation({
    mutationFn: async (serviceId: string) => {
      const response = await fetch(`/api/cms/services/${serviceId}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete service")
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] })
    },
  })

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      deleteServiceMutation.mutate(id)
    }
  }

  if (isLoading) return <div>Loading services...</div>
  if (error) return <div>Error loading services: {error.message}</div>

  return (
    <div>
      <PageHeader
        title="Services"
        subtitle="Manage the services your business offers"
        action={
          <Link href="/dashboard/cms/services/new">
            <Button>Add New Service</Button>
          </Link>
        }
      />

      <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Image 2</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services?.map((service) => (
              <TableRow key={service.id}>
                <TableCell>
                  {service.image1_url && (
                    <Image
                      src={service.image1_url}
                      alt={service.title}
                      width={64}
                      height={64}
                      className="object-cover rounded-md"
                    />
                  )}
                </TableCell>
                <TableCell>
                  {service.image2_url && (
                    <Image
                      src={service.image2_url}
                      alt={service.title}
                      width={64}
                      height={64}
                      className="object-cover rounded-md"
                    />
                  )}
                </TableCell>
                <TableCell className="font-medium">{service.title}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{service.description}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/dashboard/cms/services/edit/${service.id}`}>
                    <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(service.id)}
                    disabled={deleteServiceMutation.isPending}
                  >
                    {deleteServiceMutation.isPending ? "Deleting..." : "Delete"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4">
        <Link href="/dashboard/cms">
          <Button variant="outline">Back to CMS Dashboard</Button>
        </Link>
      </div>
    </div>
  )
}
