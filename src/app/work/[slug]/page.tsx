import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { getCaseStudy } from "@/data/case-studies";
import { CaseStudyView } from "@/components/case-study/CaseStudyView";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return {};

  const title = `${project.title} — Case Study`;
  const description = project.subtitle
    ? `${project.subtitle}. ${project.description}`
    : project.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [{ url: project.image, width: 1376, height: 768 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function WorkPage(
  props: PageProps<"/work/[slug]">
) {
  const { slug } = await props.params;

  const project = projects.find((p) => p.id === slug);
  const study = getCaseStudy(slug);
  if (!project || !study) notFound();

  const index = projects.findIndex((p) => p.id === slug);
  const nextProject = projects[(index + 1) % projects.length] ?? null;

  return <CaseStudyView project={project} study={study} nextProject={nextProject} />;
}
