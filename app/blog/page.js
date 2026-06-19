import RecentArticlesWrapper from "./RecentArticlesWrapper";
import BlogHero from "./components/BlogHero";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog - Your Zeros and Ones",
  description:
    "Insights on web development, design systems, performance, and product thinking.",
};

export default async function BlogPage() {
  let blogs = [];
  try {
    blogs = await prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    blogs = [];
  }

  return (
    <div className="bg-[#060010] font-['Inter',sans-serif]">
      <BlogHero />
      <RecentArticlesWrapper posts={blogs} />
    </div>
  );
}