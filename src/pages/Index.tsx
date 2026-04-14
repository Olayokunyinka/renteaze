import { Link } from "react-router-dom";
import { Building2, Wallet, Shield, Brain, Home, Users, TrendingUp, ArrowRight, CheckCircle2, Star, ChevronRight, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import UpcomingEvents from "@/components/UpcomingEvents";

const personas = [
  { label: "I'm a Tenant", path: "/for-tenants", icon: Home, desc: "Flexible rent solutions & savings plans" },
  { label: "I'm a Landlord", path: "/for-landlords", icon: Building2, desc: "Guaranteed income & property management" },
  { label: "I'm an Investor", path: "/for-investors", icon: TrendingUp, desc: "Premium Nigerian real estate opportunities" },
];

const differentiators = [
  { icon: Wallet, title: "Fintech-Powered", desc: "Save for rent, access rent loans, and manage payments through our integrated financial platform." },
  { icon: Brain, title: "AI-Driven Insights", desc: "Smart property matching, market analytics, and predictive pricing for better decisions." },
  { icon: Shield, title: "Full-Service Platform", desc: "End-to-end property management, facility maintenance, and tenant support in one place." },
  { icon: Building2, title: "15+ Years Expertise", desc: "Backed by Dapo Okunogbe & Partners with deep Nigerian real estate market knowledge." },
];

const stats = [
  { value: "2,000+", label: "Tenants Served" },
  { value: "500+", label: "Properties Managed" },
  { value: "300+", label: "Landlords Partnered" },
  { value: "₦2B+", label: "Loans Disbursed" },
];

const tenantSteps = [
  { step: "01", title: "Tell Us Your Needs", desc: "Share your rent budget, location preference, and timeline." },
  { step: "02", title: "Get Matched", desc: "Our AI matches you with the best rent solution — save, loan, or pay monthly." },
  { step: "03", title: "Move In Stress-Free", desc: "We handle the paperwork, payments, and move-in logistics." },
];

const landlordSteps = [
  { step: "01", title: "List Your Property", desc: "Register your property and tell us your income goals." },
  { step: "02", title: "We Handle Everything", desc: "Tenant screening, rent collection, and property maintenance — all managed." },
  { step: "03", title: "Earn Guaranteed Income", desc: "Receive consistent rental income, even during vacancies." },
];

const investorSteps = [
  { step: "01", title: "Explore Opportunities", desc: "Browse curated investment properties and joint ventures in Lagos." },
  { step: "02", title: "Due Diligence Support", desc: "We provide market data, property inspections, and legal verification." },
  { step: "03", title: "Invest & Earn Returns", desc: "Passive income from property investments managed by our expert team." },
];

const testimonials = [
  { name: "Adunni O.", role: "Tenant, Lekki", text: "Renteaze's Save for Rent plan changed my life. I no longer stress about annual rent payments!", rating: 5 },
  { name: "Chief Balogun", role: "Landlord, Victoria Island", text: "Guaranteed rent means I never worry about vacancies. Their property management is exceptional.", rating: 5 },
  { name: "Dr. Emeka N.", role: "Diaspora Investor, UK", text: "As a Nigerian in the UK, Renteaze gives me the confidence to invest back home with full transparency.", rating: 5 },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative bg-navy text-navy-foreground overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
      <div className="container mx-auto px-4 lg:px-8 py-20 md:py-28 relative">
        <div className="max-w-3xl">
          <p className="text-accent font-semibold mb-3 tracking-wide uppercase text-sm">Nigeria's #1 PropTech Platform</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Rent Smarter. <br />
            <span className="text-accent">Own Faster.</span> <br />
            Invest Better.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
            Renteaze combines fintech, AI, and deep real estate expertise to make renting, owning, and investing in Nigerian property accessible to everyone.
          </p>
        </div>

        {/* Persona selector */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
          {personas.map((p) => (
            <Link key={p.path} to={p.path}>
              <Card className="bg-primary/10 border-primary/20 hover:bg-primary/20 hover:scale-[1.02] transition-all cursor-pointer h-full">
                <CardContent className="p-5 text-center">
                  <p.icon className="h-8 w-8 mx-auto mb-2 text-accent" />
                  <p className="font-semibold text-navy-foreground">{p.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{p.desc}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* Portal Access Strip */}
    <section className="bg-light-blue border-b border-border py-4">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm font-medium text-foreground">
          Access your Renteaze portal to manage rent, properties, or investments.
        </p>
        <div className="flex gap-3">
          <Link to="/auth?tab=signin">
            <Button variant="outline" size="sm" className="gap-1.5">
              <LogIn className="h-4 w-4" /> Sign In
            </Button>
          </Link>
          <Link to="/auth">
            <Button size="sm" className="bg-accent text-accent-foreground hover:opacity-90 gap-1.5">
              <UserPlus className="h-4 w-4" /> Create Account
            </Button>
          </Link>
        </div>
      </div>
    </section>

    {/* Stats bar */}
    <section className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-3xl md:text-4xl font-bold">{s.value}</p>
            <p className="text-sm mt-1 opacity-80">{s.label}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Differentiators */}
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading title="What Makes Renteaze Different" subtitle="We're not just a listing site. We're a full-stack PropTech platform." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiators.map((d) => (
            <Card key={d.title} className="border-none shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-light-blue flex items-center justify-center mb-4">
                  <d.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{d.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* How It Works */}
    <section className="py-16 md:py-20 bg-muted">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading title="How It Works" subtitle="Getting started with Renteaze is easy — no matter who you are." />
        <Tabs defaultValue="tenant" className="max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tenant">Tenants</TabsTrigger>
            <TabsTrigger value="landlord">Landlords</TabsTrigger>
            <TabsTrigger value="investor">Investors</TabsTrigger>
          </TabsList>
          {[
            { value: "tenant", steps: tenantSteps },
            { value: "landlord", steps: landlordSteps },
            { value: "investor", steps: investorSteps },
          ].map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-8">
              <div className="space-y-6">
                {tab.steps.map((s) => (
                  <div key={s.step} className="flex gap-4 items-start">
                    <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shrink-0">
                      {s.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{s.title}</h4>
                      <p className="text-muted-foreground text-sm mt-1">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link to={`/auth?role=${tab.value}`}>
                  <Button className="bg-accent text-accent-foreground hover:opacity-90 gap-2">
                    Get Started as {tab.value === "tenant" ? "a Tenant" : tab.value === "landlord" ? "a Landlord" : "an Investor"} <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading title="What Our Clients Say" subtitle="Real stories from tenants, landlords, and investors across Nigeria." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t.name} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic mb-4">"{t.text}"</p>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* Upcoming Events */}
    <UpcomingEvents />

    {/* Diaspora CTA */}
    <section className="py-16 md:py-20 bg-navy text-navy-foreground">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Nigerian in the Diaspora?</h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Invest in premium Lagos real estate with full transparency, professional management, and guaranteed returns — all from abroad.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/for-investors">
            <Button size="lg" className="bg-accent text-accent-foreground hover:opacity-90 gap-2">
              Explore Investment Opportunities <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <a href="https://wa.me/2348000000000?text=Hello%20Renteaze%2C%20I%27m%20a%20diaspora%20investor%20interested%20in%20opportunities" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              Speak to an Advisor
            </Button>
          </a>
        </div>
      </div>
    </section>

    {/* Solutions Overview */}
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading title="Solutions for Everyone" subtitle="Whether you rent, own, or invest — we have a plan for you." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {personas.map((p) => (
            <Link key={p.path} to={p.path}>
              <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full border-2 hover:border-primary">
                <CardContent className="p-8 text-center">
                  <p.icon className="h-12 w-12 mx-auto mb-4 text-primary group-hover:text-accent transition-colors" />
                  <h3 className="text-xl font-semibold mb-2">{p.label.replace("I'm a ", "")}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{p.desc}</p>
                  <span className="text-primary font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn More <ChevronRight className="h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 md:py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
        <p className="mt-4 text-lg opacity-90 max-w-xl mx-auto">
          Join thousands of Nigerians already renting smarter, owning faster, and investing better with Renteaze.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/auth">
            <Button size="lg" className="bg-accent text-accent-foreground hover:opacity-90">
              Create Your Account
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
