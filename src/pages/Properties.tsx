import { useState } from "react";
import { Search, MapPin, Bed, Bath, Maximize, Home } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import LeadCaptureForm from "@/components/LeadCaptureForm";

const properties = [
  { id: 1, title: "3 Bedroom Apartment", type: "Rent", location: "Lekki Phase 1", price: "₦3,500,000/yr", beds: 3, baths: 3, sqm: 150, features: ["24hr Power", "Swimming Pool", "Security"], img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80" },
  { id: 2, title: "4 Bedroom Duplex", type: "Sale", location: "Victoria Island", price: "₦85,000,000", beds: 4, baths: 4, sqm: 280, features: ["BQ", "Parking", "Garden"], img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80" },
  { id: 3, title: "2 Bedroom Flat", type: "Rent", location: "Yaba", price: "₦1,800,000/yr", beds: 2, baths: 2, sqm: 90, features: ["Prepaid Meter", "Water", "Tiled"], img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80" },
  { id: 4, title: "Luxury Penthouse", type: "Short-Let", location: "Ikoyi", price: "₦150,000/night", beds: 3, baths: 3, sqm: 200, features: ["Ocean View", "Gym", "Concierge"], img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80" },
  { id: 5, title: "Studio Apartment", type: "Rent", location: "Ikeja GRA", price: "₦1,200,000/yr", beds: 1, baths: 1, sqm: 45, features: ["Furnished", "AC", "Security"], img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80" },
  { id: 6, title: "5 Bedroom Detached", type: "Sale", location: "Banana Island", price: "₦350,000,000", beds: 5, baths: 6, sqm: 500, features: ["Pool", "Cinema", "Smart Home"], img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" },
];

const Properties = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [bedsFilter, setBedsFilter] = useState("all");

  const filtered = properties.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || p.type === typeFilter;
    const matchesBeds = bedsFilter === "all" || p.beds === Number(bedsFilter);
    return matchesSearch && matchesType && matchesBeds;
  });

  return (
    <Layout>
      <section className="bg-navy text-navy-foreground py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Find Your <span className="text-accent">Perfect Property</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse curated properties across Lagos — for rent, purchase, or short-let.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b sticky top-16 bg-background z-40">
        <div className="container mx-auto px-4 lg:px-8 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Rent">Rent</SelectItem>
              <SelectItem value="Sale">Sale</SelectItem>
              <SelectItem value="Short-Let">Short-Let</SelectItem>
            </SelectContent>
          </Select>
          <Select value={bedsFilter} onValueChange={setBedsFilter}>
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="Bedrooms" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Beds</SelectItem>
              {[1, 2, 3, 4, 5].map((b) => (
                <SelectItem key={b} value={String(b)}>{b} Bed{b > 1 ? "s" : ""}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Home className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg font-medium">No properties match your filters</p>
              <p className="text-muted-foreground text-sm">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <Dialog key={p.id}>
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden">
                      <img src={p.img} alt={p.title} className="w-full h-48 object-cover" loading="lazy" />
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold px-2 py-1 rounded bg-primary/10 text-primary">{p.type}</span>
                          <span className="font-bold text-primary">{p.price}</span>
                        </div>
                        <h3 className="font-semibold text-lg">{p.title}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" /> {p.location}
                        </p>
                        <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Bed className="h-3 w-3" /> {p.beds}</span>
                          <span className="flex items-center gap-1"><Bath className="h-3 w-3" /> {p.baths}</span>
                          <span className="flex items-center gap-1"><Maximize className="h-3 w-3" /> {p.sqm}sqm</span>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>{p.title}</DialogTitle>
                    </DialogHeader>
                    <img src={p.img} alt={p.title} className="w-full h-56 object-cover rounded-lg" />
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-semibold px-2 py-1 rounded bg-primary/10 text-primary">{p.type}</span>
                        <span className="font-bold text-xl text-primary">{p.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-4 w-4" /> {p.location}</p>
                      <div className="flex gap-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Bed className="h-4 w-4" /> {p.beds} Beds</span>
                        <span className="flex items-center gap-1"><Bath className="h-4 w-4" /> {p.baths} Baths</span>
                        <span className="flex items-center gap-1"><Maximize className="h-4 w-4" /> {p.sqm}sqm</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {p.features.map((f) => (
                          <span key={f} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">{f}</span>
                        ))}
                      </div>
                      <LeadCaptureForm persona="general" />
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Properties;
