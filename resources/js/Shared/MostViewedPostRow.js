import { Badge } from '@mantine/core'
import { Link } from '@inertiajs/inertia-react';

const MostViewedPostRow = ({index, post}) => {
  return (
    <tr className='hover:bg-gray-200'>
        <td>{index+1}</td>
        <td>
            <Link href={route('posts.show',post)}>
                <img src={post.featured_image} style={{width:"50px",height:"50px",objectFit:"cover"}}/>
            </Link>
        </td>
        <td>
            <h4 className='font-bold'><Link href={route('posts.show',post)}>{post.title}</Link></h4>
            <span className='text-xs'>Written By {post.author.name}</span></td>
        <td><Badge>{post.views}</Badge></td>
    </tr>
  )
}

export default MostViewedPostRow
