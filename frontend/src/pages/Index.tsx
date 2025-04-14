
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Resources from "@/components/Resources";
import StudentProfiles from "@/components/StudentProfiles";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import UpcomingEvents from "@/components/UpcomingEvents";

const Index = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      <Header />
      <main>
        <Hero />
        <Features />
        <Resources />
        <UpcomingEvents />
        <StudentProfiles />
        {/* <ContactForm /> */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
