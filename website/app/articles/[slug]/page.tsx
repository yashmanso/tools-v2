import { notFound } from 'next/navigation';
import { getResourceBySlug, getResourcesByCategory, getAllResources } from '@/app/lib/markdown';
import { ResourcesSection } from '@/app/components/ResourcesSection';
import { TagList } from '@/app/components/TagList';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getResourcesByCategory('articles');
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const resource = await getResourceBySlug('articles', slug);

  if (!resource) {
    notFound();
  }

  const allResources = getAllResources();

  return (
    <article className="max-w-3xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold mb-6 tracking-tight">{resource.title}</h1>
        <TagList tags={resource.tags} allResources={allResources} />
      </div>

      <div
        className="prose prose-neutral dark:prose-invert max-w-none
          prose-headings:font-semibold prose-headings:tracking-tight
          prose-h1:text-2xl prose-h1:mb-6 prose-h1:mt-10
          prose-h2:text-xl prose-h2:mb-4 prose-h2:mt-10 prose-h2:pb-3 prose-h2:border-b prose-h2:border-[var(--border)]
          prose-h3:text-lg prose-h3:mb-3 prose-h3:mt-8
          prose-p:mb-5 prose-p:leading-relaxed prose-p:text-[var(--text-secondary)]
          prose-ul:mb-6 prose-ul:ml-4 prose-ul:space-y-2
          prose-li:text-[var(--text-secondary)]
          prose-a:text-[var(--text-primary)] prose-a:underline prose-a:decoration-[var(--border)] hover:prose-a:decoration-[var(--text-muted)]
          prose-strong:font-semibold prose-strong:text-[var(--text-primary)]
          prose-img:rounded-lg prose-img:my-8"
        dangerouslySetInnerHTML={{ __html: resource.contentHtml }}
      />

      <ResourcesSection attachments={resource.attachments} pageTitle={resource.title} />
    </article>
  );
}
