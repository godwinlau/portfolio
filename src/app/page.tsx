import { Header, Footer } from '@/components/layout';
import { Hero, WorkSlider, CaseStudies, StackGrid, About, ChatCTA } from '@/components/sections';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WorkSlider />
        <CaseStudies />
        <StackGrid />
        <About />
        <ChatCTA />
      </main>
      <Footer />
    </>
  );
}
