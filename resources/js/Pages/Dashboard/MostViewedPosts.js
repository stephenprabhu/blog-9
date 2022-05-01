import { Card, Table } from '@mantine/core';
import MostViewedPostRow from '../../Shared/MostViewedPostRow';

const MostViewedPosts = ({posts}) => {
  return (
            <Card shadow="lg" className='mt-4'>
                <h3 className="text-lg font-bold mb-2">Most Viewed Posts</h3>
                <Table verticalSpacing="sm">
                   <tbody>
                    {posts.map((post, index)=>(
                        <MostViewedPostRow key={index} index={index} post={post} />
                    ))}
                   </tbody>
                </Table>
            </Card>
  )
}

export default MostViewedPosts
