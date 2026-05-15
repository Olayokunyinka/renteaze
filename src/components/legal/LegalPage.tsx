import { ReactNode } from "react";
import Layout from "@/components/Layout";

interface Props {
  title: string;
  description: string;
  lastUpdated?: string;
  children: ReactNode;
}

const LegalPage = ({ title, description, lastUpdated = "May 2026", children }: Props) => (
  <Layout>
    <section className="bg-navy text-navy-foreground py-14">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <p className="text-accent font-semibold uppercase text-xs tracking-wide mb-2">Legal</p>
        <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
        <p className="mt-3 text-muted-foreground">{description}</p>
        <p className="mt-4 text-xs text-muted-foreground/80">
          Renteaze is operated by Renteaze International Limited (RC 1768094) · Last updated: {lastUpdated}
        </p>
      </div>
    </section>

    <section className="py-12 md:py-16">
      <article className="container mx-auto px-4 lg:px-8 max-w-3xl prose prose-slate prose-headings:font-semibold prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-primary">
        {children}
        <hr className="my-10" />
        <p className="text-xs text-muted-foreground">
          This document is provided for informational purposes and does not constitute legal advice.
          For questions about this policy, contact{" "}
          <a href="mailto:legal@renteaze.com">legal@renteaze.com</a>.
        </p>
      </article>
    </section>
  </Layout>
);

export default LegalPage;
