
import { cn } from "@/lib/utils";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink = ({ href, children }: FooterLinkProps) => (
  <a 
    href={href}
    className="text-gray-500 transition-colors hover:text-primary btn-link"
  >
    {children}
  </a>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        {/* Top section */}
        <div className="grid gap-10 pb-10 md:grid-cols-2 md:gap-16 lg:grid-cols-5">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <a href="#" className="text-xl font-bold tracking-tight text-primary">
              StudentConnect
            </a>
            
            <p className="mt-4 text-sm text-gray-500 max-w-md">
              A community-driven platform designed to connect students across campuses for a better learning experience. Share knowledge, find study partners, and build lasting connections.
            </p>
            
            <div className="mt-6 flex space-x-4">
              <button className="rounded-full bg-gray-200 p-2 text-gray-600 transition-colors hover:bg-primary hover:text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 10H17.5L17 12H13V20H11V12H7V10H11V8.128C11 6.345 11.186 5.698 11.534 5.046C11.875 4.402 12.427 3.874 13.081 3.539C13.716 3.216 14.407 3 16.021 3C16.338 3 16.687 3.027 17 3.055V5H16.021C14.775 5 14.336 5.104 14.004 5.338C13.699 5.548 13.5 5.875 13.5 6.5V10Z" fill="currentColor" />
                </svg>
              </button>
              
              <button className="rounded-full bg-gray-200 p-2 text-gray-600 transition-colors hover:bg-primary hover:text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.4592 6.01238C21.6896 6.35373 20.8624 6.58442 19.9944 6.68815C20.8803 6.15701 21.5609 5.31598 21.8813 4.31378C21.052 4.80564 20.1336 5.16278 19.156 5.3552C18.3732 4.52112 17.2579 4 16.0235 4C13.6534 4 11.7317 5.92147 11.7317 8.29155C11.7317 8.6279 11.7697 8.95546 11.8429 9.2696C8.27609 9.0906 5.11375 7.38203 2.9923 4.78551C2.62296 5.41935 2.41607 6.15656 2.41607 6.94309C2.41607 8.43204 3.17366 9.74563 4.32523 10.5153C3.6218 10.4929 2.95997 10.2999 2.3814 9.97846C2.38099 9.99639 2.38099 10.0143 2.38099 10.0324C2.38099 12.1118 3.86033 13.8463 5.8236 14.2406C5.4635 14.3387 5.08435 14.3912 4.69295 14.3912C4.41641 14.3912 4.14756 14.3642 3.88547 14.3142C4.43162 16.0191 6.01654 17.26 7.89454 17.2945C6.42577 18.4457 4.57528 19.1318 2.56454 19.1318C2.21813 19.1318 1.87652 19.1114 1.54078 19.0717C3.44004 20.2902 5.70592 21 8.1408 21C16.0117 21 20.3279 14.4605 20.3279 8.78918C20.3279 8.60314 20.3238 8.41805 20.3158 8.23395C21.1566 7.62886 21.8839 6.87302 22.4592 6.01238Z" fill="currentColor" />
                </svg>
              </button>
              
              <button className="rounded-full bg-gray-200 p-2 text-gray-600 transition-colors hover:bg-primary hover:text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.94 5C6.94 5.95 6.17 6.71 5.22 6.71C4.27 6.71 3.5 5.95 3.5 5C3.5 4.05 4.27 3.29 5.22 3.29C6.17 3.29 6.94 4.05 6.94 5ZM7 8H3.5V21H7V8ZM13.36 8H9.9V21H13.36V14.25C13.36 10.92 17.78 10.63 17.78 14.25V21H21.25V12.96C21.25 7.79 14.93 8 13.36 10.79V8Z" fill="currentColor" />
                </svg>
              </button>
              
              <button className="rounded-full bg-gray-200 p-2 text-gray-600 transition-colors hover:bg-primary hover:text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.543 7.10188C21.4388 6.69532 21.1995 6.32582 20.865 6.04176C20.5305 5.7577 20.1163 5.56546 19.6752 5.48988C18.0912 5.16588 12 5.16588 12 5.16588C12 5.16588 5.90879 5.16588 4.32479 5.48988C3.88368 5.56546 3.46951 5.7577 3.13504 6.04176C2.80056 6.32582 2.56129 6.69532 2.45712 7.10188C2.13312 8.68588 2.13312 11.7139 2.13312 11.7139C2.13312 11.7139 2.13312 14.7419 2.45712 16.3259C2.56129 16.7324 2.80056 17.1019 3.13504 17.386C3.46951 17.67 3.88368 17.8623 4.32479 17.9379C5.90879 18.2619 12 18.2619 12 18.2619C12 18.2619 18.0912 18.2619 19.6752 17.9379C20.1163 17.8623 20.5305 17.67 20.865 17.386C21.1995 17.1019 21.4388 16.7324 21.543 16.3259C21.867 14.7419 21.867 11.7139 21.867 11.7139C21.867 11.7139 21.867 8.68588 21.543 7.10188ZM9.8808 14.4999V8.92788L15.4068 11.7139L9.8808 14.4999Z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
              Platform
            </h3>
            <ul className="space-y-3 text-sm">
              <li><FooterLink href="#">How it works</FooterLink></li>
              <li><FooterLink href="#">Features</FooterLink></li>
              <li><FooterLink href="#">Community</FooterLink></li>
              <li><FooterLink href="#">Student resources</FooterLink></li>
              <li><FooterLink href="#">Events</FooterLink></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
              Resources
            </h3>
            <ul className="space-y-3 text-sm">
              <li><FooterLink href="#">Help center</FooterLink></li>
              <li><FooterLink href="#">Blog</FooterLink></li>
              <li><FooterLink href="#">Study guides</FooterLink></li>
              <li><FooterLink href="#">Tutorials</FooterLink></li>
              <li><FooterLink href="#">Learning paths</FooterLink></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li><FooterLink href="#">About us</FooterLink></li>
              <li><FooterLink href="#">Careers</FooterLink></li>
              <li><FooterLink href="#">Contact</FooterLink></li>
              <li><FooterLink href="#">Privacy policy</FooterLink></li>
              <li><FooterLink href="#">Terms of service</FooterLink></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="flex flex-col items-center justify-between border-t border-gray-200 pt-10 md:flex-row">
          <p className="mb-4 text-center text-sm text-gray-500 md:mb-0">
            © {currentYear} StudentConnect. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Terms of Service</FooterLink>
            <FooterLink href="#">Cookie Policy</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
