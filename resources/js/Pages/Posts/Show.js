import Layout from "../../Shared/Layout";
import { Link } from "@inertiajs/inertia-react";
import { Card, Grid, Accordion } from "@mantine/core";
import moment from "moment";
import SimpleTextLabelSection from "../../Shared/SimpleTextLabelSection";
import {MdPerson, MdCategory, MdOutlineOpenInNew}  from "react-icons/md";
import InfoWithIcon from "../../Shared/InfoWithIcon";
const PostShow = ({post}) => {
  return (
    <div>
       <div className="flex justify-between">
            <h1 className="mb-8 text-3xl font-bold">
                <Link
                    href={route("posts.index")}
                    className="text-indigo-600 hover:text-indigo-700"
                >
                    Posts
                </Link>

                <span className="font-medium text-indigo-600"> /</span> Details
            </h1>
           <div className="mt-2">
                <Link href={route('posts.edit',post)} className="btn-indigo mr-3">Edit Post</Link>
                <a href={route('front.post',post)} target="_blank" rel="noopener noreferrer" className="btn-indigo">View On Website <MdOutlineOpenInNew style={{display:'inline'}}/></a>
           </div>
       </div>
      <Grid>
          <Grid.Col span={8}>
                <Card shadow="lg">
                   <Grid>
                       <Grid.Col span={4}>
                           <img src={post.featured_image} style={{width:"500px",height:"200px",objectFit:'cover'}}/>
                       </Grid.Col>
                       <Grid.Col span={8}>
                            <h1 className="font-bold text-xl">{post.title}</h1>
                            <p>
                                {post.snippet}
                            </p>
                            <InfoWithIcon icon={MdPerson}> Written By {post.author.name} </InfoWithIcon>
                            <InfoWithIcon color="orange" icon={MdCategory}> Category - {post.category.name} </InfoWithIcon>

                        </Grid.Col>
                   </Grid>
                </Card>
                <Accordion>
                    <Accordion.Item label="Body">
                        <div dangerouslySetInnerHTML={{__html: post.body}} />
                    </Accordion.Item>

                    <Accordion.Item label="Comments">
                       {post.comments.map((comment)=>(
                           <Card shadow="lg" className="mb-2">
                                <p>
                                    {comment.message}
                                </p>
                               <span className="text-xs"> By {comment.user.name} on  {moment(comment.created_at).format('MMM DD, YYYY')}</span>
                           </Card>
                        ))}
                    </Accordion.Item>
                </Accordion>

          </Grid.Col>
          <Grid.Col span={4}>
            <Card className="mx-3" shadow="lg">
                <SimpleTextLabelSection label="Created On">
                    {moment(post.created_at).format('MMM DD, YYYY')}
                </SimpleTextLabelSection>
                <SimpleTextLabelSection label="Published On">
                    {moment(post.published_date).format('MMM DD, YYYY') || "Not Published"}
                </SimpleTextLabelSection>
                <SimpleTextLabelSection label="Total Views">
                    {post.views}
                </SimpleTextLabelSection>
                <SimpleTextLabelSection label="Total Comments">
                    {post.comments.length}
                </SimpleTextLabelSection>
                <SimpleTextLabelSection label="Tags">
                    <div className="mt-3">
                        {post.tags.map(tag =>
                            <span key={tag.id} className="bg-gray-200 rounded-md p-2 mr-2 ">{tag.name.en}</span>)
                        }
                    </div>
                </SimpleTextLabelSection>
            </Card>
            <Card shadow="lg" className="mx-3 mt-3">
                <h4 className="mb-2 font-bold">Meta Description: </h4>
                {post.meta_description}

                <h4 className="mt-4 mb-2 font-bold">Meta Keywords: </h4>
                {post.meta_keywords || 'No Keywords Set'}
            </Card>
         </Grid.Col>
      </Grid>

    </div>
  )
}

PostShow.layout = (page) => <Layout title="Post Details" children={page} />;

export default PostShow
