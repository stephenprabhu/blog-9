import { Card, SimpleGrid } from '@mantine/core'
import React from 'react'
import Layout from '../../Shared/Layout';

const Dashboard = () => {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
        <SimpleGrid cols={3}>
           <Card className='bg-indigo-200'>
           <SimpleGrid cols={3} className='pl-5'>
           <div>
                Posts
                <div className='text-3xl font-extrabold'>22</div>
           </div>
           <div>
                Categories
                <div className='text-3xl font-extrabold'>5</div>
           </div>
           <div>
                Users
                <div className='text-3xl font-extrabold'>150</div>
           </div>
           </SimpleGrid>


           </Card>
        </SimpleGrid>

    </div>
  )
}

Dashboard.layout = page => <Layout title="dashboard" children={page} />

export default Dashboard
