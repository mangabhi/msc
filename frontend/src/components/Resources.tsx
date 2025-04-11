import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

interface Resource {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  downloadUrl: string;
}

interface ResourceCardProps {
  resource: Resource;
  onDelete: (id: number) => void;
}

const ResourceCard = ({ resource, onDelete }: ResourceCardProps) => {
  const { id, title, description, icon, downloadUrl } = resource;
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-slideUp");
          entry.target.classList.remove("opacity-0");
          observer.unobserve(entry.target);
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
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)", // Linear gradient
        borderRadius: "12px", // Optional: Add rounded corners
        color: "white", // Ensure text is readable
      }}
      className="glass-panel opacity-0 p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
    >
      <div className="mb-6 flex items-center gap-4">
        <Avatar>
          <AvatarImage src={`/avatars/resource-${id}.png`} alt={title} />
          <AvatarFallback>{title.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      <h3 className="mb-3 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground text-white">{description}</p>
      <div className="mt-4 flex gap-4">
        <a
          href={downloadUrl}
          download
          className="rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark"
        >
          Download
        </a>
        <button
          onClick={() => onDelete(id)}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const Resources = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    file: null as File | null,
  });
  const [resources, setResources] = useState<Resource[]>([
    {
      id: 1,
      title: "Peer-to-Peer Learning",
      description:
        "Connect with fellow students for collaborative learning experiences and knowledge sharing.",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.5 13C18.9853 13 21 15.0147 21 17.5C21 19.9853 18.9853 22 16.5 22C14.0147 22 12 19.9853 12 17.5C12 15.0147 14.0147 13 16.5 13ZM7.5 13C9.98528 13 12 15.0147 12 17.5C12 19.9853 9.98528 22 7.5 22C5.01472 22 3 19.9853 3 17.5C3 15.0147 5.01472 13 7.5 13ZM16.5 15C15.1193 15 14 16.1193 14 17.5C14 18.8807 15.1193 20 16.5 20C17.8807 20 19 18.8807 19 17.5C19 16.1193 17.8807 15 16.5 15ZM7.5 15C6.11929 15 5 16.1193 5 17.5C5 18.8807 6.11929 20 7.5 20C8.88071 20 10 18.8807 10 17.5C10 16.1193 8.88071 15 7.5 15ZM12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7C7 4.23858 9.23858 2 12 2ZM12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4Z"
            fill="currentColor"
          />
        </svg>
      ),
      downloadUrl: "/downloads/peer-to-peer-learning.pdf",
    },
    {
      id: 2,
      title: "Study Groups",
      description:
        "Create or join study groups based on your courses, interests, or academic goals.",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.2429 21 6.20969 21 8.5C21 11.5376 18.5376 14 15.5 14C14.4745 14 13.5167 13.7429 12.6838 13.2852L13.6724 11.6997C14.1638 11.8926 14.7163 12 15.5 12C17.433 12 19 10.433 19 8.5C19 7.0681 18.1317 5.82445 16.8662 5.31272L17.5962 3.41321Z"
            fill="currentColor"
          />
        </svg>
      ),
      downloadUrl: "/downloads/study-groups.pdf",
    },
    {
      id: 3,
      title: "Resource Sharing",
      description:
        "Exchange notes, study materials, and resources to enhance your learning experience.",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 22H4V2H14L15.586 3.586L20 8V22ZM18 20V10H13V5H6V20H18ZM12 13V11H7V13H12ZM17 17V15H7V17H17Z"
            fill="currentColor"
          />
        </svg>
      ),
      downloadUrl: "/downloads/resource-sharing.pdf",
    },
    {
      id: 4,
      title: "Mentorship",
      description:
        "Connect with experienced students for guidance, advice, and academic support.",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.5 2C3.67157 2 3 2.67157 3 3.5V20.5C3 21.3284 3.67157 22 4.5 22H19.5C20.3284 22 21 21.3284 21 20.5V8H16V3H4.5ZM16 10H19V20H5V4H14V10H16ZM12 12V19H17V17H14V12H12ZM7 8H11V6H7V8ZM7 12H11V10H7V12ZM7 16H11V14H7V16Z"
            fill="currentColor"
          />
        </svg>
      ),
      downloadUrl: "/downloads/mentorship.pdf",
    },
    {
      id: 5,
      title: "Event Planning",
      description:
        "Organize and participate in student-led events, workshops, and study sessions.",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9V3H15V1H17V3ZM4 9V19H20V9H4ZM4 5V7H20V5H4ZM6 11H8V13H6V11ZM11 11H13V13H11V11ZM16 11H18V13H16V11Z"
            fill="currentColor"
          />
        </svg>
      ),
      downloadUrl: "/downloads/event-planning.pdf",
    },
    {
      id: 6,
      title: "Skill Development",
      description:
        "Learn new skills through peer-led workshops, tutorials, and collaborative projects.",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 22V20H11V22H7ZM13 22V20H17V22H13ZM3 18V16H5V4H19V16H21V18H3ZM7 16H17V6H7V16ZM10 14H14V13.2367L11.9872 11.2122L13.2428 9.95205L14.0202 10.7343L15.2929 9.46729L12.0031 6.14428L7.70708 10.4673L8.98001 11.7403L10.1509 10.5636L11.4038 11.8278L9.38757 13.8556L10 14Z"
            fill="currentColor"
          />
        </svg>
      ),
      downloadUrl: "/downloads/skill-development.pdf",
    },
  ]);

  const handleDelete = (id: number) => {
    setResources((prevResources) =>
      prevResources.filter((resource) => resource.id !== id)
    );
  };
  const handleAddResource = (newResource: Resource) => {
    setResources((prevResources) => [...prevResources, newResource]);
  };

  return (
    <section ref={sectionRef} id="resources"  className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 style={{fontSize: "2.5rem"}}
            ref={headingRef}>

        Everything you need to <span className="text-primary">succeed together</span>
          </h2>
        {/* Dialog for Adding Resource */}
        <Dialog>
            <DialogTrigger className="mb-6 rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark">
              Add Resource
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a New Resource</DialogTitle>
                <DialogDescription>
                  Fill in the details below to add a new resource.
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const newResource = {
                    id: resources.length + 1,
                    title: formData.get("title") as string,
                    description: formData.get("description") as string,
                    icon: (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                          fill="currentColor"
                        />
                      </svg>
                    ),
                    downloadUrl: "/downloads/new-resource.pdf",
                  };
                  handleAddResource(newResource);
                }}
              >
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-4"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    required
                    className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2" 
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="Upload Document" className="block text-sm font-medium text-gray-700">
                    Upload Document
                  </label>
                  <input
                    type="file"
                    name="Upload Document"
                    id="documentUpload"
                    required
                    className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
                <DialogFooter>
                  <button
                    type="submit"
                    className="rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark"
                  >
                    Add
                  </button>
                  <DialogClose className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300">
                    Cancel
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;