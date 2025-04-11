
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slideUp');
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (formRef.current) {
        formRef.current.reset();
      }
      
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <section id="contact" className="bg-white py-24">
      <div 
        ref={containerRef}
        className="container mx-auto px-6 opacity-0"
      >
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Get in <span className="text-primary">touch</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Have questions or want to join our community? We'd love to hear from you.
          </p>
        </div>
        
        <div className="mx-auto max-w-4xl">
          <div className="glass-panel overflow-hidden rounded-2xl">
            <div className="grid md:grid-cols-5">
              {/* Left column - Contact information */}
              <div className="bg-primary p-8 text-white md:col-span-2">
                <h3 className="mb-6 text-xl font-semibold">Contact Information</h3>
                <p className="mb-8 text-sm text-white/80">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.238L12.072 14.338L4 7.216V19H20V7.238ZM4.511 5L12.055 11.662L19.502 5H4.511Z" fill="currentColor" />
                    </svg>
                    <span className="text-sm">contact@studentconnect.com</span>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.36565 10.6177L10.5789 11.8309C10.8754 12.1274 10.9554 12.5573 10.8033 12.9354C10.5729 13.5439 10.2661 14.1422 9.88982 14.7186C11.0345 16.7758 12.6559 18.397 14.7133 19.5415C15.2893 19.1654 15.8873 18.8587 16.4955 18.6284C16.8736 18.4762 17.3034 18.5564 17.5999 18.8527L18.813 20.0659C19.2759 20.5288 19.296 21.2662 18.8585 21.7515L17.9887 22.6213C17.4735 23.1365 16.7653 23.3955 16.0486 23.3133C14.3406 23.113 12.7079 22.2521 11.1164 20.6607C9.68981 19.2342 8.38072 17.477 7.17346 15.3891C5.97336 13.3136 5.0607 11.2247 4.87743 9.2825C4.79496 8.56585 5.0539 7.85764 5.56906 7.34249L6.43884 6.47271C6.92415 6.03517 7.66149 6.05531 8.12437 6.51819L9.33758 7.73141C9.63385 8.0277 9.71409 8.45745 9.56195 8.8356C9.33163 9.44372 9.02489 10.0419 8.6488 10.6179C8.88272 10.6179 9.13172 10.6187 9.36565 10.6177ZM6.9999 2.99923L7.00001 4.99923C7.00001 5.55151 7.44773 5.99923 8.00001 5.99923C8.5523 5.99923 9.00001 5.55151 9.00001 4.99923L9 2.99923C9 2.44694 8.55228 1.99923 8 1.99923C7.44772 1.99923 7 2.44694 6.9999 2.99923ZM13 1.99923C12.4477 1.99923 12 2.44694 12 2.99923C12 3.55151 12.4477 3.99923 13 3.99923H15C15.5523 3.99923 16 3.55151 16 2.99923C16 2.44694 15.5523 1.99923 15 1.99923H13ZM12 7.99923C12 8.55151 12.4477 8.99923 13 8.99923H15C15.5523 8.99923 16 8.55151 16 7.99923C16 7.44694 15.5523 6.99923 15 6.99923H13C12.4477 6.99923 12 7.44694 12 7.99923ZM18 2.99923C17.4477 2.99923 17 3.44694 17 3.99923V5.99923C17 6.55151 17.4477 6.99923 18 6.99923C18.5523 6.99923 19 6.55151 19 5.99923V3.99923C19 3.44694 18.5523 2.99923 18 2.99923Z" fill="currentColor" />
                    </svg>
                    <span className="text-sm">(555) 123-4567</span>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 20.8995L6.84999 15.7495C6.56626 15.466 6.24258 15.2288 5.88766 15.0491C5.53274 14.8694 5.15119 14.7494 4.75884 14.6944C4.36649 14.6393 3.96866 14.6502 3.5799 14.7264C3.19114 14.8027 2.81825 14.9432 2.47499 15.1419C2.94161 13.5796 3.93737 12.2308 5.30653 11.3471C6.67569 10.4635 8.32066 10.1011 9.93325 10.326C11.5459 10.5508 13.0138 11.3488 14.0822 12.5773C15.1506 13.8058 15.751 15.3743 15.775 16.9995H15.775C16.7999 16.9995 17.783 16.594 18.5095 15.8688C19.236 15.1435 19.6428 14.1612 19.6444 13.1368C19.646 12.1124 19.2422 11.1289 18.5179 10.4012C17.7936 9.67358 16.8118 9.26644 15.787 9.26465C15.787 8.23978 15.3805 7.25691 14.655 6.53153C13.9296 5.80615 12.9466 5.39941 11.9217 5.39941C10.8969 5.39941 9.91401 5.80615 9.18862 6.53153C8.46323 7.25691 8.07031 8.23978 8.06999 9.26465C7.04582 9.26429 6.06295 9.67103 5.33757 10.3964C4.61219 11.1218 4.20837 12.1047 4.20837 13.1296C4.20837 13.5438 4.27544 13.9539 4.40593 14.3426C3.7868 14.1256 3.20497 13.8043 2.68299 13.3927C2.16101 12.981 1.70806 12.4863 1.34499 11.9283C0.898663 11.2419 0.598253 10.4668 0.461115 9.65842C0.323977 8.85009 0.352878 8.02316 0.545749 7.22868C0.73862 6.43421 1.0912 5.69045 1.58521 5.04467C2.07922 4.39888 2.70223 3.86507 3.41337 3.4787C4.12451 3.09234 4.90789 2.86157 5.70942 2.80144C6.51096 2.7413 7.31838 2.85327 8.07999 3.12902C8.53127 1.51737 9.56221 0.132785 10.9863 -0.787988C12.4104 -1.70876 14.1334 -2.08279 15.8034 -1.83943C17.4734 -1.59607 18.9575 -0.759329 20.0245 0.493053C21.0916 1.74543 21.6571 3.32291 21.62 4.94465C22.9582 5.65306 24.0058 6.82348 24.5711 8.25106C25.1365 9.67864 25.18 11.2666 24.6944 12.7249C24.2089 14.1832 23.226 15.4045 21.9126 16.164C20.5993 16.9235 19.0482 17.1655 17.556 16.8445C16.9614 18.5203 15.791 19.9271 14.2559 20.8281C12.7209 21.7292 10.9177 22.0675 9.17499 21.7895L12 24.6145L10.59 26.0245L5.17001 20.6045C4.6075 20.0429 4.16074 19.37 3.85747 18.6277C3.5542 17.8854 3.39958 17.0884 3.40121 16.2828C3.40283 15.4773 3.56066 14.681 3.86696 13.9399C4.17326 13.1988 4.62279 12.5276 5.18764 11.9683C5.75249 11.4091 6.42813 10.9661 7.1721 10.6669C7.91607 10.3677 8.71387 10.2175 9.51941 10.2238C10.325 10.2301 11.1201 10.3926 11.8587 10.7033C12.5973 11.014 13.2647 11.4677 13.82 11.9995C13.82 11.3968 13.9994 10.8113 14.33 10.3245C14.6606 9.83766 15.1261 9.47444 15.6672 9.28951C16.2083 9.10458 16.7943 9.10762 17.3332 9.29823C17.8722 9.48884 18.3338 9.85696 18.66 10.3476C19.3326 9.782 20.1378 9.41387 20.9953 9.27764C21.8528 9.14142 22.7297 9.24166 23.535 9.56786C24.3403 9.89407 25.0428 10.4335 25.5693 11.1298C26.0957 11.8261 26.4271 12.6551 26.53 13.5274C26.6329 14.3997 26.5032 15.2845 26.1539 16.0902C25.8046 16.8959 25.2473 17.594 24.5366 18.1133C23.8259 18.6325 22.9878 18.954 22.115 19.0453C21.2422 19.1366 20.3634 18.9944 19.562 18.6325C19.0459 19.55 18.2659 20.2992 17.32 20.7895C16.3741 21.2798 15.3104 21.4883 14.2558 21.3895C13.2012 21.2906 12.2031 20.8888 11.375 20.2345C10.547 19.5801 9.92296 18.7034 9.57999 17.7145C9.26791 18.3726 8.71573 18.8969 8.02987 19.1941C7.34402 19.4913 6.5737 19.5394 5.85999 19.3295L11.999 25.4995L12 20.8995Z" fill="currentColor" />
                    </svg>
                    <span className="text-sm">University Campus, Building A,<br />Suite 200, Anytown, AN 12345</span>
                  </div>
                </div>
                
                <div className="mt-12 flex space-x-4">
                  <button className="rounded-full bg-white/20 p-2 text-white transition-colors hover:bg-white/30">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 10H17.5L17 12H13V20H11V12H7V10H11V8.128C11 6.345 11.186 5.698 11.534 5.046C11.875 4.402 12.427 3.874 13.081 3.539C13.716 3.216 14.407 3 16.021 3C16.338 3 16.687 3.027 17 3.055V5H16.021C14.775 5 14.336 5.104 14.004 5.338C13.699 5.548 13.5 5.875 13.5 6.5V10Z" fill="currentColor" />
                    </svg>
                  </button>
                  
                  <button className="rounded-full bg-white/20 p-2 text-white transition-colors hover:bg-white/30">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.4592 6.01238C21.6896 6.35373 20.8624 6.58442 19.9944 6.68815C20.8803 6.15701 21.5609 5.31598 21.8813 4.31378C21.052 4.80564 20.1336 5.16278 19.156 5.3552C18.3732 4.52112 17.2579 4 16.0235 4C13.6534 4 11.7317 5.92147 11.7317 8.29155C11.7317 8.6279 11.7697 8.95546 11.8429 9.2696C8.27609 9.0906 5.11375 7.38203 2.9923 4.78551C2.62296 5.41935 2.41607 6.15656 2.41607 6.94309C2.41607 8.43204 3.17366 9.74563 4.32523 10.5153C3.6218 10.4929 2.95997 10.2999 2.3814 9.97846C2.38099 9.99639 2.38099 10.0143 2.38099 10.0324C2.38099 12.1118 3.86033 13.8463 5.8236 14.2406C5.4635 14.3387 5.08435 14.3912 4.69295 14.3912C4.41641 14.3912 4.14756 14.3642 3.88547 14.3142C4.43162 16.0191 6.01654 17.26 7.89454 17.2945C6.42577 18.4457 4.57528 19.1318 2.56454 19.1318C2.21813 19.1318 1.87652 19.1114 1.54078 19.0717C3.44004 20.2902 5.70592 21 8.1408 21C16.0117 21 20.3279 14.4605 20.3279 8.78918C20.3279 8.60314 20.3238 8.41805 20.3158 8.23395C21.1566 7.62886 21.8839 6.87302 22.4592 6.01238Z" fill="currentColor" />
                    </svg>
                  </button>
                  
                  <button className="rounded-full bg-white/20 p-2 text-white transition-colors hover:bg-white/30">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.94 5C6.94 5.95 6.17 6.71 5.22 6.71C4.27 6.71 3.5 5.95 3.5 5C3.5 4.05 4.27 3.29 5.22 3.29C6.17 3.29 6.94 4.05 6.94 5ZM7 8H3.5V21H7V8ZM13.36 8H9.9V21H13.36V14.25C13.36 10.92 17.78 10.63 17.78 14.25V21H21.25V12.96C21.25 7.79 14.93 8 13.36 10.79V8Z" fill="currentColor" />
                    </svg>
                  </button>
                  
                  <button className="rounded-full bg-white/20 p-2 text-white transition-colors hover:bg-white/30">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.543 7.10188C21.4388 6.69532 21.1995 6.32582 20.865 6.04176C20.5305 5.7577 20.1163 5.56546 19.6752 5.48988C18.0912 5.16588 12 5.16588 12 5.16588C12 5.16588 5.90879 5.16588 4.32479 5.48988C3.88368 5.56546 3.46951 5.7577 3.13504 6.04176C2.80056 6.32582 2.56129 6.69532 2.45712 7.10188C2.13312 8.68588 2.13312 11.7139 2.13312 11.7139C2.13312 11.7139 2.13312 14.7419 2.45712 16.3259C2.56129 16.7324 2.80056 17.1019 3.13504 17.386C3.46951 17.67 3.88368 17.8623 4.32479 17.9379C5.90879 18.2619 12 18.2619 12 18.2619C12 18.2619 18.0912 18.2619 19.6752 17.9379C20.1163 17.8623 20.5305 17.67 20.865 17.386C21.1995 17.1019 21.4388 16.7324 21.543 16.3259C21.867 14.7419 21.867 11.7139 21.867 11.7139C21.867 11.7139 21.867 8.68588 21.543 7.10188ZM9.8808 14.4999V8.92788L15.4068 11.7139L9.8808 14.4999Z" fill="currentColor" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Right column - Contact form */}
              <div className="p-8 md:col-span-3">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Your first name"
                      />
                    </div>
                    
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Your email address"
                    />
                  </div>
                  
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="How can we help you?"
                    />
                  </div>
                  
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Your message"
                    />
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "w-full rounded-lg bg-primary p-3 text-sm font-medium text-white transition-all hover:bg-primary/90",
                        isSubmitting && "cursor-not-allowed opacity-70"
                      )}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                    
                    {isSuccess && (
                      <p className="mt-3 text-center text-sm text-green-600">
                        Your message has been sent successfully!
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
