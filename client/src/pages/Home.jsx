import { Hero } from '../components/home/Hero';
import { AboutSnippet } from '../components/home/AboutSnippet';
import { SignatureDishes } from '../components/home/SignatureDishes';
import { Experience } from '../components/home/Experience';
import { Testimonials } from '../components/home/Testimonials';
import { ReservationBanner } from '../components/home/ReservationBanner';
import { GalleryStrip } from '../components/home/GalleryStrip';
import { InstagramStrip } from '../components/home/InstagramStrip';

export function Home() {
  return (
    <main>
      <Hero />
      <AboutSnippet />
      <SignatureDishes />
      <Experience />
      <Testimonials />
      <ReservationBanner />
      <GalleryStrip />
      <InstagramStrip />
    </main>
  );
}
