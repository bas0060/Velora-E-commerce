import React from 'react'
import BlogStory from '@/modules/home/components/BlogStory'
import BlogTeam from '@/modules/home/components/BlogTeam'
import BlogStat from '@/modules/home/components/BlogStat'

const BlogsPage = () => {
  return (
    <div>
      <BlogStory/>
      <BlogStat/>
      <BlogTeam/>
    </div>
  )
}

export default BlogsPage
