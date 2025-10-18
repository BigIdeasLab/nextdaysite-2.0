'use client'

import { useUsers } from '@/hooks'
import { format } from 'date-fns'

export function AdminCustomers() {
  const { data: users = [], isLoading: usersLoading } = useUsers()

  const customers = users.filter((user) => user.role === 'customer')

  if (usersLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex flex-col gap-10'>
      <header className='flex flex-col gap-2'>
        <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
          All Customers
        </h1>
        <p className='text-sm text-foreground/70 sm:text-base'>
          Manage and monitor all customers in the system.
        </p>
      </header>

      <section className='rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm shadow-foreground/5'>
        <div className='overflow-x-auto -mx-4 sm:mx-0'>
          <table className='min-w-full divide-y divide-foreground/10'>
            <thead>
              <tr>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-foreground/60'
                >
                  Name
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-foreground/60'
                >
                  Email
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-foreground/60'
                >
                  Company
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-foreground/60'
                >
                  Plan
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-foreground/60'
                >
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-foreground/10'>
              {customers.map((user) => (
                <tr key={user.id}>
                  <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground'>
                    {user.full_name}
                  </td>
                  <td className='whitespace-nowrap px-6 py-4 text-sm text-foreground/70'>
                    {user.email}
                  </td>
                  <td className='whitespace-nowrap px-6 py-4 text-sm text-foreground/70'>
                    {user.company_name}
                  </td>
                  <td className='whitespace-nowrap px-6 py-4 text-sm text-foreground/70'>
                    {user.plan_id}
                  </td>
                  <td className='whitespace-nowrap px-6 py-4 text-sm text-foreground/70'>
                    {format(new Date(user.created_at), 'MMM d, yyyy')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
