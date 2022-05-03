import { Link } from '@inertiajs/inertia-react';
import { Card, Table } from '@mantine/core';
import moment from 'moment';
import {MdOutlineEast} from "react-icons/md";
const RecentComments = ({comments}) => {
  return (
        <Card shadow="lg" className='mt-4 flex flex-col justify-between'>
            <h3 className="text-lg font-bold mb-2">Recent Comments</h3>
           { comments && comments.length > 0 ?
           <Table verticalSpacing="sm" className='flex-1'>
                <tbody>
                   {comments.map(comment=>(
                    <tr>
                        <td>
                            <h4>On <Link className='text-indigo-600' href={route('posts.show',comment.post)}>{comment.post.title}</Link></h4>
                            <div className='bg-gray-300 border-2 py-1 px-1 my-1'>
                                {comment.message}
                            </div>
                            By {comment.user.name} On {moment(comment.created_at).format('MMM DD, YYYY')}
                        </td>
                    </tr>
                   ))}
                </tbody>
            </Table>
            :
            <p className='text-center font-bold'>
                No Comments Yet!
            </p>
            }
            <Link
                className='text-indigo-600'
                href={route('comments.index')}>
                    See All <MdOutlineEast className='inline mb-1'/>
            </Link>
        </Card>
  )
}

export default RecentComments
