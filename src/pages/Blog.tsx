import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";

const categories = ["All", "Tenants", "Landlords", "Investors", "Market Insights", "PropTech"];

const posts = [
  {
    id: "tenant-rights-lagos",
    title: "Understanding Your Rights as a Tenant in Lagos",
    excerpt: "Know your legal protections under Nigerian tenancy law — from rent receipts to eviction procedures.",
    category: "Tenants",
    date: "2024-12-15",
    readTime: "5 min",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
  },
  {
    id: "landlord-rental-income",
    title: "5 Ways to Maximize Your Rental Income in 2025",
    excerpt: "Strategic tips for landlords looking to increase property returns while minimizing vacancies.",
    category: "Landlords",
    date: "2024-12-10",
    readTime: "7 min",
    img: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=600&q=80",
  },
  {
    id: "lagos-real-estate-market",
    title: "Lagos Real Estate Market: 2025 Outlook",
    excerpt: "Analyzing trends, pricing, and opportunities in Lagos's rapidly evolving property market.",
    category: "Market Insights",
    date: "2024-12-05",
    readTime: "8 min",
    img: "https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?w=600&q=80",
  },
  {
    id: "proptech-nigeria",
    title: "How PropTech Is Transforming Nigerian Real Estate",
    excerpt: "From fintech-powered rent plans to AI property matching — technology is reshaping the industry.",
    category: "PropTech",
    date: "2024-11-28",
    readTime: "6 min",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
  },
  {
    id: "diaspora-investment-guide",
    title: "A Diaspora Guide to Investing in Nigerian Real Estate",
    excerpt: "Everything you need to know about investing back home — from due diligence to management.",
    category: "Investors",
    date: "2024-11-20",
    readTime: "10 min",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
  },
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? posts : posts.filter((p) => p.category === activeCategory);

  return (
    <Layout>
      <section className="bg-navy text-navy-foreground py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Blog & <span className="text-accent">Insights</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert advice, market analysis, and guides for tenants, landlords, and investors.
          </p>
        </div>
      </section>

      {/* Category filters */}
      <section className="py-6 border-b sticky top-16 bg-background z-40">
        <div className="container mx-auto px-4 lg:px-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Button
              key={c}
              variant={activeCategory === c ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(c)}
            >
              {c}
            </Button>
          ))}
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img src={post.img} alt={post.title} className="w-full h-48 object-cover" loading="lazy" />
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-primary/10 text-primary flex items-center gap-1">
                      <Tag className="h-3 w-3" /> {post.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(post.date).toLocaleDateString("en-NG", { month: "short", day: "numeric", year: "numeric" })}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
