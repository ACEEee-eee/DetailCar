import { useCallback, useState } from 'react';
import About from '@/components/About';
import BookingForm from '@/components/BookingForm';
import Contacts from '@/components/Contacts';
import Footer from '@/components/Footer';
import Gallery from '@/components/Gallery';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';

export default function HomePage() {
  const [serviceId, setServiceId] = useState('');

  const handleBook = useCallback((id: string) => {
    setServiceId(id);
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100">
      <Header />
      <main>
        <Hero />
        <Services onBook={handleBook} />
        <Gallery />
        <About />
        <BookingForm serviceId={serviceId} onServiceChange={setServiceId} />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
}
