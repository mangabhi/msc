
import { useEffect, useRef } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const FeatureCard = ({ title, description, icon, index }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-slideUp');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }, index * 100);
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index]);
  
  return (
    <div 
      ref={cardRef}
      className="glass-panel opacity-0 p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
    >
      <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mb-3 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
          entry.target.classList.remove('opacity-0');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (headingRef.current) {
      observer.observe(headingRef.current);
    }
    
    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);
  
  const features = [
    {
      title: "Peer-to-Peer Learning",
      description: "Connect with fellow students for collaborative learning experiences and knowledge sharing.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.5 13C18.9853 13 21 15.0147 21 17.5C21 19.9853 18.9853 22 16.5 22C14.0147 22 12 19.9853 12 17.5C12 15.0147 14.0147 13 16.5 13ZM7.5 13C9.98528 13 12 15.0147 12 17.5C12 19.9853 9.98528 22 7.5 22C5.01472 22 3 19.9853 3 17.5C3 15.0147 5.01472 13 7.5 13ZM16.5 15C15.1193 15 14 16.1193 14 17.5C14 18.8807 15.1193 20 16.5 20C17.8807 20 19 18.8807 19 17.5C19 16.1193 17.8807 15 16.5 15ZM7.5 15C6.11929 15 5 16.1193 5 17.5C5 18.8807 6.11929 20 7.5 20C8.88071 20 10 18.8807 10 17.5C10 16.1193 8.88071 15 7.5 15ZM12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7C7 4.23858 9.23858 2 12 2ZM12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4Z" fill="currentColor" />
        </svg>
      )
    },
    {
      title: "Chat Support Globally",
      description: "Connect with peers and mentors worldwide through real-time chat support for academic and personal growth.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 5.58 2 10C2 12.39 3.19 14.53 5.12 15.91L4.1 19.9C4.04 20.16 4.14 20.43 4.36 20.58C4.49 20.67 4.64 20.71 4.79 20.71C4.91 20.71 5.03 20.68 5.14 20.62L9.5 18.5C10.3 18.67 11.14 18.76 12 18.76C17.52 18.76 22 15.18 22 10C22 5.58 17.52 2 12 2ZM12 16.76C11.3 16.76 10.61 16.69 9.94 16.56L9.5 16.48L6.1 18.1L6.74 15.39L6.5 15.22C4.79 14.03 3.76 12.15 3.76 10C3.76 6.69 7.5 4 12 4C16.5 4 20.24 6.69 20.24 10C20.24 13.31 16.5 16.76 12 16.76ZM8 9H16V11H8V9ZM8 12H13V14H8V12Z" fill="currentColor" />
        </svg>
      )
    },
    {
      title: "Resource Sharing",
      description: "Exchange notes, study materials, and resources to enhance your learning experience.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 22H4V2H14L15.586 3.586L20 8V22ZM18 20V10H13V5H6V20H18ZM12 13V11H7V13H12ZM17 17V15H7V17H17Z" fill="currentColor" />
        </svg>
      )
    },
    {
      title: "Mentorship",
      description: "Connect with experienced students for guidance, advice, and academic support.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.5 2C3.67157 2 3 2.67157 3 3.5V20.5C3 21.3284 3.67157 22 4.5 22H19.5C20.3284 22 21 21.3284 21 20.5V8H16V3H4.5ZM16 10H19V20H5V4H14V10H16ZM12 12V19H17V17H14V12H12ZM7 8H11V6H7V8ZM7 12H11V10H7V12ZM7 16H11V14H7V16Z" fill="currentColor" />
        </svg>
      )
    },
    {
      title: "Event Planning",
      description: "Organize and participate in student-led events, workshops, and study sessions.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9V3H15V1H17V3ZM4 9V19H20V9H4ZM4 5V7H20V5H4ZM6 11H8V13H6V11ZM11 11H13V13H11V11ZM16 11H18V13H16V11Z" fill="currentColor" />
        </svg>
      )
    },
    {
      title: "Assessment Reminder",
      description: "Stay on top of your assignments and exams with timely reminders and notifications.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 7H13V13H11V7ZM11 15H13V17H11V15Z" fill="currentColor" />
        </svg>
      )
    }
  ];
  
  return (
    <section ref={sectionRef} id="features" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 
            ref={headingRef} 
            className="text-3xl font-bold opacity-0 md:text-4xl"
          >
            Everything you need to <span className="text-primary">succeed together</span>
          </h2>
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
