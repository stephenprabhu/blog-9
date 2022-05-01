import Layout from '../../Shared/Layout';
import {MdBookmarks, MdSupervisorAccount, MdRemoveRedEye, MdOutlineComment}  from "react-icons/md";
import StatCardWithLogo from '../../Shared/StatCardWithLogo';
import { SimpleGrid } from '@mantine/core';
import MostViewedPosts from './MostViewedPosts';
import RecentComments from './RecentComments';

const Dashboard = (props) => {
    const {postsCount, viewsCount, usersCount, commentsCount, popularPosts, recentComments} = props;
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
       <SimpleGrid cols={4} className="w-full">
            <StatCardWithLogo icon={MdBookmarks} label="Posts" color='orange' val={postsCount} />
            <StatCardWithLogo icon={MdRemoveRedEye} color="indigo" label="Total Views" val={viewsCount} />
            <StatCardWithLogo icon={MdSupervisorAccount} label="Registered Users" val={usersCount}/>
            <StatCardWithLogo icon={MdOutlineComment} label="Total Comments" color="cyan" val={commentsCount}/>
       </SimpleGrid>

       <SimpleGrid cols={2}>
            <MostViewedPosts posts={popularPosts} />
            <RecentComments comments={recentComments} />
        </SimpleGrid>


    </div>
  )
}

Dashboard.layout = page => <Layout title="dashboard" children={page} />

export default Dashboard
