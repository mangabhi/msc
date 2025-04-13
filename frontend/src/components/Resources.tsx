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
import {
  upload_resource,
  get_resource,
  delete_resource,
  is_authenticated,
} from "../endpoints/api";

interface Resource {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  fileupload: string;
}

interface ResourceCardProps {
  resource: Resource;
  onDelete: (id: number) => void;
  is_superuser: boolean;
}

const ResourceCard = ({ resource, onDelete ,is_superuser}: ResourceCardProps) => {
  const { id, title, description, fileupload } = resource;
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
          href={fileupload}
          download
          className="rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark"
        >
          Download
        </a>
        {is_superuser && ( 
          <button
            onClick={() => onDelete(id)}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

const Resources = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<{ authenticated: boolean , is_superuser :boolean } | null>(null);
  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      try {
        const response = await is_authenticated(); // Call the API
        console.log("Authentication response:", response);
        setIsAuthenticated(response); // Update state based on response
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuth();
  }, []);
  const getResources = () => {
    get_resource()
      .then((response) => {
        console.log("Resources fetched successfully:", response.data);
        setResources(response.data);
      })
      .catch((error) => {
        console.error("Error fetching resources:", error);
      });
  };
  useEffect(() => {
    getResources();
  }, []);
  const handleDelete = (id: number) => {
    delete_resource(id)
      .then((response) => {
        console.log("Resources fetched successfully:", response.data);
        getResources();
      })
      .catch((error) => {
        console.error("Error fetching resources:", error);
      });
    setResources((prevResources) =>
      prevResources.filter((resource) => resource.id !== id)
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("fileupload", file);
    try {
      const response = await upload_resource(formData);
      console.log("Resource upload successful:", response);
    } catch (err) {
      console.error("Login error:", err);
    }
  };
  return (
    <section ref={sectionRef} id="resources" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 style={{ fontSize: "2.5rem" }} ref={headingRef}>
            Everything you need to{" "}
            <span className="text-primary">succeed together</span>
          </h2>
          {isAuthenticated?.authenticated === true && (
            <>
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
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-4"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="Upload Document"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Upload Document
                      </label>
                      <input
                        type="file"
                        name="fileUpload"
                        id="fileUpload"
                        required
                        onChange={(e) => setFile(e.target.files[0])}
                        accept=".pdf, .doc, .docx, .ppt, .pptx, .txt"
                        className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                    </div>
                    <DialogFooter>
                      <DialogClose
                        type="submit"
                        className="rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark"
                      >
                        Add
                      </DialogClose>
                      <DialogClose className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300">
                        Cancel
                      </DialogClose>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {resources
            ?.reverse()
            ?.slice(0, 6)
            .map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onDelete={handleDelete}
                is_superuser={isAuthenticated?.is_superuser}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;
