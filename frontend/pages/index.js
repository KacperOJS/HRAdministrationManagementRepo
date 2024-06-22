import Image from 'next/image'
import Head from 'next/head'

import Header from '@/components/Header'
import TopCards from '@/components/TopCards'
import BarChart from '@/components/BarChart'
import RecentOrders from '@/components/RecentOrders'

export default function Home() {
  return (
    <>
    <Head>
      <title>User Destktop next.js</title>
      <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </Head>
    <main className="bg-gray-100 min-h-screen">
      <Header/>
      {/* <TopCards/> */}
      <div className='p-4 grid md:grid-cols-3 grid-cols-1 gap-4'>
        {/* <BarChart/> */}
        {/* <RecentOrders/> */}
      </div>
    </main>
    </>
  )
}
