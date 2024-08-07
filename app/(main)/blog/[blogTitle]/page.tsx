import { Suspense } from "react";
import BlogContainer from "../../../components/blogContainer";

type Params = {
  blogTitle: string;
};

export default function BlogPage({ params }: { params: Params }) {
  const title = decodeURIComponent(params.blogTitle);
  return (
    <main>
      <Suspense>
        <BlogContainer title={title} />
      </Suspense>

    </main>
  )
}