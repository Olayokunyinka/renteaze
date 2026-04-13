import { Brain, Wallet, Cpu, BarChart3, Shield, Zap, Database, Cloud } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";

const pillars = [
  { icon: Wallet, title: "Fintech Engine", desc: "Integrated savings, loans, and payment processing. Save for rent, access financing, and make seamless payments — all within the platform.", features: ["Automated savings plans", "Rent loan processing", "Digital payment gateway", "Real-time transaction tracking"] },
  { icon: Brain, title: "AI & Machine Learning", desc: "Smart property matching, predictive pricing, and market intelligence. Our AI helps you make better real estate decisions.", features: ["Property recommendation engine", "Market price predictions", "Tenant risk scoring", "Investment opportunity analysis"] },
  { icon: Cpu, title: "Automation & Workflow", desc: "From tenant onboarding to maintenance requests — our automated workflows eliminate manual processes and reduce errors.", features: ["Automated lease management", "Maintenance request routing", "Rent collection automation", "Digital document management"] },
  { icon: BarChart3, title: "Data Intelligence", desc: "Real-time dashboards, analytics, and reporting. Get complete visibility into your properties, tenants, and investments.", features: ["Owner/investor dashboards", "Occupancy analytics", "Financial reporting", "Market trend analysis"] },
];

const techDiff = [
  { icon: Shield, title: "Security First", desc: "Bank-grade encryption, secure payments, and data protection compliant with Nigerian regulations." },
  { icon: Zap, title: "Real-Time Processing", desc: "Instant rent calculations, immediate application responses, and live portfolio tracking." },
  { icon: Database, title: "Integrated Data", desc: "All property, tenant, and financial data connected in one platform for seamless operations." },
  { icon: Cloud, title: "Cloud-Native", desc: "Accessible anywhere, anytime. Manage your properties from Lagos or London with the same experience." },
];

const Platform = () => (
  <Layout>
    <section className="bg-navy text-navy-foreground py-16 md:py-24">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <p className="text-accent font-semibold mb-3 uppercase text-sm tracking-wide">Our Platform</p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto">
          The Technology Behind <span className="text-accent">Smarter Real Estate</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Renteaze is built on four technology pillars that transform how Nigerians rent, own, and invest in property.
        </p>
      </div>
    </section>

    {/* Platform Pillars */}
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading title="Platform Ecosystem" subtitle="Four integrated pillars powering the future of Nigerian PropTech." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((p) => (
            <Card key={p.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-light-blue flex items-center justify-center mb-4">
                  <p.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.desc}</p>
                <ul className="space-y-2">
                  {p.features.map((f) => (
                    <li key={f} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* Tech Differentiators */}
    <section className="py-16 md:py-20 bg-muted">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading title="Why Our Tech Matters" subtitle="Built for Nigeria's unique real estate challenges." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techDiff.map((d) => (
            <Card key={d.title} className="border-none shadow-md text-center">
              <CardContent className="p-6">
                <d.icon className="h-10 w-10 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">{d.title}</h3>
                <p className="text-sm text-muted-foreground">{d.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Platform;
