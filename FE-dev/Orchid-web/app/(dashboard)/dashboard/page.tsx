
import React from 'react'
import { User, columns } from './_components/columns'
import { DataTable } from '@/components/ui/data-table'
import TotalWidget from '@/components/dashboard/widget/total-widget'
import RevenueFlow from '@/components/dashboard/revenueFlow/page'
import Efficiency from '@/components/dashboard/revenueFlow/Efficiency'
import ListTab from '@/components/dashboard/listTab/page'
import Wallet from '@/components/dashboard/wallet/page'
async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      name: "vinh",
      location: "USSA",
      email: "m@example.com",
      spent: 200
    },
    {
      id: "2",
      name: "fuzzy",
      location: "USSA",
      email: "112m@example.com",
      spent: 200
    },
   
    // ...
  ]
}
const DashboardPage = async() => {
  const data = await getData()
  return (
    <main className="w-full px-6 pb-6 pt-[100px] sm:pt-[156px] xl:px-12 xl:pb-12">
    {/* write your code here */}
    <div className="2xl:flex 2xl:space-x-[48px]">
      <section className="mb-6 2xl:mb-0 2xl:flex-1">
        <TotalWidget />
        <div className="mb-[24px] w-full xl:flex xl:space-x-[24px]">
          <RevenueFlow />
          <Efficiency />
        </div>

        <ListTab />
        <DataTable columns={columns} data={data} searchKey='email' />
      </section>
      <section className="flex w-full flex-col space-x-0 lg:flex-row lg:space-x-6 2xl:w-[400px] 2xl:flex-col 2xl:space-x-0">
        <Wallet />
      </section>
    </div>
  </main>
  )
}

export default DashboardPage