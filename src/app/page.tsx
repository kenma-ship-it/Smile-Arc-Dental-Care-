import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Gallery } from "@/components/sections/Gallery";
import { Reviews } from "@/components/sections/Reviews";
import { Faqs } from "@/components/sections/Faqs";
import { BookingForm } from "@/components/sections/BookingForm";
import { Location } from "@/components/sections/Location";
import { Cta } from "@/components/sections/Cta";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Reviews />
      <BookingForm />
      <Faqs />
      <Location />
      <Cta />
      <Footer />
    </>
  );
}
