<div class="news-post standard-post">
    <div class="image-holder">
        <a href="{{route('front.post', $post->slug)}}">
            <img
                src="{{$post->featured_image ? $post->featured_image : asset('images/upload/blog/p1.jpg')}}"
                alt=""
                style="object-fit: cover; width:270px; height:210px"
            >
        </a>
    </div>
    <a class="text-link" href="#">{{$post->category->name ?? ''}}</a>
    <h2><a href="{{route('front.post', $post->slug)}}">{{$post->title}}</a></h2>
    <ul class="post-tags">
        <li>by <a href="#">{{$post->author->name ?? '-'}}my</a></li>
        <li>{{$post->created_at->diffForHumans()}}</li>
    </ul>
</div>
