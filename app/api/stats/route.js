// app/api/stats/route.js
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [projects, clients] = await Promise.all([
      prisma.portfolio.count({ where: { published: true } }),
      prisma.client.count({ where: { published: true } }),
    ]);

    return Response.json({
      projects,
      clients,
      years: 15,
      support: "24/7",
    });
  } catch (error) {
    console.error("Stats API error:", error);
    return Response.json(
      {
        projects: 20,
        clients: 30,
        years: 15,
        support: "24/7",
      },
      { status: 200 } // Return fallback data instead of error
    );
  }
}