
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface StudentProfile {
  name: string;
  role: string;
  testimonial: string;
  university: string;
}

const StudentProfiles = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const profiles: StudentProfile[] = [
    {
      name: "Alex Johnson",
      role: "Computer Science Major",
      testimonial: "StudentConnect helped me find study partners for my advanced algorithms course. The peer-to-peer learning approach has significantly improved my understanding of complex topics.",
      university: "Stanford University"
    },
    {
      name: "Samantha Lee",
      role: "Biology Student",
      testimonial: "I've been able to connect with other pre-med students through this platform. We regularly share resources and help each other prepare for exams. It's been invaluable!",
      university: "University of Michigan"
    },
    {
      name: "Marcus Williams",
      role: "Business Administration",
      testimonial: "Finding students to collaborate with on group projects used to be challenging. This platform made it easy to connect with peers who share my academic interests and work ethic.",
      university: "NYU Stern"
    },
    {
      name: "Priya Patel",
      role: "Data Science Graduate",
      testimonial: "As a mentor on StudentConnect, I've been able to guide younger students while reinforcing my own knowledge. It's a rewarding experience that benefits everyone involved.",
      university: "UC Berkeley"
    }
  ];
  
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
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % profiles.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [profiles.length]);
  
  return (
    <section 
      id="community" 
      className="bg-gradient-to-b from-blue-50 to-white py-24"
    >
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Hear from our <span className="text-primary">community</span>
          </h2>
        </div>
        
        <div 
          ref={containerRef}
          className="opacity-0 mx-auto max-w-4xl"
        >
          {/* Testimonial card */}
          <div className="glass-panel relative overflow-hidden p-8 md:p-12">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
            
            <div className="flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-8">
              {/* Avatar and name section */}
              <div className="flex flex-col items-center md:items-start">
                <div className="mb-4 h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-medium text-primary">
                    {profiles[activeIndex].name.charAt(0)}
                  </span>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-lg font-semibold">{profiles[activeIndex].name}</h3>
                  <p className="text-sm text-muted-foreground">{profiles[activeIndex].role}</p>
                  <p className="text-xs text-primary mt-1">{profiles[activeIndex].university}</p>
                </div>
              </div>
              
              {/* Testimonial content */}
              <div className="relative flex-1">
                <svg 
                  className="absolute -top-2 -left-2 h-8 w-8 text-primary/20" 
                  fill="currentColor" 
                  viewBox="0 0 32 32"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                
                <p className="relative z-10 italic text-muted-foreground">
                  "{profiles[activeIndex].testimonial}"
                </p>
              </div>
            </div>
            
            {/* Navigation dots */}
            <div className="mt-8 flex justify-center space-x-2">
              {profiles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all",
                    index === activeIndex 
                      ? "bg-primary w-8" 
                      : "bg-gray-300 hover:bg-gray-400"
                  )}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Profile cards */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {profiles.map((profile, index) => (
              <div 
                key={profile.name}
                className={cn(
                  "glass-panel cursor-pointer p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg",
                  index === activeIndex ? "border-primary ring-1 ring-primary" : ""
                )}
                onClick={() => setActiveIndex(index)}
              >
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-medium text-primary">
                    {profile.name.charAt(0)}
                  </span>
                </div>
                <h4 className="text-base font-medium">{profile.name}</h4>
                <p className="text-xs text-muted-foreground">{profile.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentProfiles;
