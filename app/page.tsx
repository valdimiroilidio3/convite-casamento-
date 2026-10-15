import Preloader from '@/components/Preloader';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Letter from '@/components/Letter';
import LoveStory from '@/components/LoveStory';
import Countdown from '@/components/Countdown';
import EventDetails from '@/components/EventDetails';
import Gallery from '@/components/Gallery';
import RSVPForm from '@/components/RSVPForm';
import Gifts from '@/components/Gifts';
import FAQ from '@/components/FAQ';
import LocationSection from '@/components/LocationSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      <main>
        <Hero />
        <Letter />
        <LoveStory />
        <Countdown />
        <EventDetails />
        <Gallery />
        <RSVPForm />
        <Gifts />
        <FAQ />
        <LocationSection />
      </main>
      <Footer />
    </>
  );
}
