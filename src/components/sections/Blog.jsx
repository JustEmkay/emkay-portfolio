import React from 'react';

const Blog = () => {
  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: 'Getting Started with React Hooks',
      excerpt: 'Learn how to use React Hooks to simplify your functional components and manage state effectively.',
      date: 'June 15, 2023',
      readTime: '5 min read',
      category: 'React',
      image: 'https://via.placeholder.com/600x400?text=React+Hooks',
      link: '#'
    },
    {
      id: 2,
      title: 'Building Responsive Layouts with CSS Grid',
      excerpt: 'Discover how to create complex, responsive layouts using CSS Grid with just a few lines of code.',
      date: 'May 22, 2023',
      readTime: '7 min read',
      category: 'CSS',
      image: 'https://via.placeholder.com/600x400?text=CSS+Grid',
      link: '#'
    },
    {
      id: 3,
      title: 'JavaScript Performance Optimization Tips',
      excerpt: 'Improve your web application performance with these essential JavaScript optimization techniques.',
      date: 'April 10, 2023',
      readTime: '8 min read',
      category: 'JavaScript',
      image: 'https://via.placeholder.com/600x400?text=JS+Performance',
      link: '#'
    },
    {
      id: 4,
      title: 'Introduction to TypeScript for React Developers',
      excerpt: 'Learn how TypeScript can enhance your React development experience with static typing.',
      date: 'March 5, 2023',
      readTime: '6 min read',
      category: 'TypeScript',
      image: 'https://via.placeholder.com/600x400?text=TypeScript',
      link: '#'
    },
  ];

  return (
    <section style={{ backgroundColor: '#20B2AA' }}>
      <div className="section-content">
        <h2 className="section-title mb-8 md:mb-12">Blog/Notes</h2>
        
        <div className="text-center mb-8">
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            This is a placeholder for the blog section. Here you can share your thoughts, tutorials, and insights.
          </p>
        </div>
        
        {/* Blog posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <a 
              href={post.link} 
              key={post.id} 
              className="bg-white bg-opacity-10 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105 flex flex-col h-full"
            >
              <div className="relative pb-[56.25%] overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-teal-700 text-white text-xs md:text-sm px-2 py-1 rounded-full">
                  {post.category}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center text-sm text-teal-100 mb-2">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h3 className="text-lg md:text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-sm md:text-base mb-4 flex-grow">{post.excerpt}</p>
                
                <div className="mt-auto">
                  <span className="inline-flex items-center text-sm md:text-base font-medium">
                    Read More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
        
        {/* View all posts button */}
        <div className="text-center mt-12">
          <button className="px-6 py-3 bg-white text-teal-700 rounded-lg text-lg font-bold hover:bg-opacity-90 transition-colors duration-300 shadow-lg">
            View All Posts
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blog;