
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-white pt-24 pb-16">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-100/40 to-transparent"></div>
      <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-blue-200/20 blur-3xl"></div>
      <div className="absolute top-40 -left-10 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl"></div>

      {/* Main content */}
      <div className="container relative mx-auto px-6 py-24 md:py-32">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left column - Text content */}
          <div className="space-y-8">
            <span
              className={cn(
                "inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary",
                isLoaded ? "animate-fadeIn reveal-delay-1" : "opacity-0"
              )}
            >
              Student to Student Platform
            </span>

            <h1
              className={cn(
                "text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl",
                isLoaded ? "animate-slideUp reveal-delay-2" : "opacity-0"
              )}
            >
              Connect, Learn, <br />
              <span className="text-primary">Grow Together</span>
            </h1>

            <p
              className={cn(
                "max-w-md text-lg text-muted-foreground",
                isLoaded ? "animate-slideUp reveal-delay-3" : "opacity-0"
              )}
            >
              A community platform designed by students, for students. Share
              knowledge, find study partners, and build lasting connections.
            </p>

            <div
              className={cn(
                "flex flex-wrap items-center gap-4",
                isLoaded ? "animate-slideUp reveal-delay-4" : "opacity-0"
              )}
            >
              <Link to="/login">
                <button className="rounded-full bg-primary px-8 py-3 font-medium text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30">
                  Get Started
                </button>
              </Link>

              <button className="flex items-center gap-2 font-medium text-foreground underline-offset-4 transition-all hover:text-primary hover:underline">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4338 7.5L4 3.57925Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Watch how it works
              </button>
            </div>

            <div
              className={cn(
                "flex items-center gap-3 text-sm text-muted-foreground",
                isLoaded ? "animate-slideUp reveal-delay-5" : "opacity-0"
              )}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="inline-block h-8 w-8 rounded-full border-2 border-white bg-gray-200"
                  />
                ))}
              </div>
              <span>
                Join <span className="font-medium text-foreground">2,000+</span>{" "}
                students already on the platform
              </span>
            </div>
          </div>

          {/* Right column - Image/illustration */}
          <div
            className={cn(
              "relative aspect-square",
              isLoaded ? "animate-slideRight reveal-delay-4" : "opacity-0"
            )}
          >
            {/* Main image container with glass effect */}
            <div className="glass-panel h-full w-full overflow-hidden p-1">
              <div className="h-full w-full rounded-xl bg-gray-200 overflow-hidden flex items-center justify-center">
                <div className="text-gray-400 text-center px-8">
                  {/* <img src="https://images.pexels.com/photos/1462633/pexels-photo-1462633.jpeg" alt="Student Collaboration" className="w-full h-auto" /> */}
                  {/* <p className="text-sm">Student collaboration</p>
                  <p className="text-xs mt-1">(Placeholder for illustration)</p> */}
                  <video autoPlay loop muted className="w-full h-auto" src="https://videos.pexels.com/video-files/3209298/3209298-uhd_2560_1440_25fps.mp4"></video>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-xl bg-blue-100 animate-float"></div>
            <div
              className="absolute -bottom-6 -left-6 h-32 w-32 rounded-xl bg-primary/10 animate-float"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0L48 8.875C96 17.75 192 35.5 288 44.375C384 53.25 480 53.25 576 35.5C672 17.75 768 -17.75 864 8.875C960 35.5 1056 125.125 1152 142.875C1248 160.625 1344 107.375 1392 80.75L1440 53.25V250H1392C1344 250 1248 250 1152 250C1056 250 960 250 864 250C768 250 672 250 576 250C480 250 384 250 288 250C192 250 96 250 48 250H0V0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
