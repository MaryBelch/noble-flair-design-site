import Blog from '../components/Blog/Blog';
import BlogPost from '../components/Blog/BlogPost';
import { useParams } from 'react-router-dom';
import { TranslatedErrorBoundary } from '../components/UI/ErrorBoundary';

export default function BlogPage() {
  const { id } = useParams();

  return (
    <>
      <TranslatedErrorBoundary>
        {id ? <BlogPost /> : <Blog />}
      </TranslatedErrorBoundary>
    </>
  );
}