import React, { useState,useRef ,useEffect} from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar as CalendarIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import {
  upcoming_event,
  get_upcoming_event,
  delete_upcoming_event,
  is_authenticated,
} from "../endpoints/api";
import "./styles/UpcomingEvents.css";

interface Event {
  id: number;
  name: string;
  location: string;
  date_from: Date;
  date_to: Date;
  image: string;
  description: string;
}

const UpcomingEvents = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [events, setEvents] = useState<Event[]>([]);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [image, setImage] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState<{ authenticated: boolean , is_superuser :boolean } | null>(null);

  console.log("isAuthenticated",name,description,location,dateFrom,dateTo );
  
   useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await is_authenticated(); 
          console.log("Authentication response:", response);
          setIsAuthenticated(response); 
        } catch (error) {
          console.error("Error checking authentication:", error);
        }
      };
  
      checkAuth();
    }, []);

  const openEventDetails = (event: Event) => {
    console.log("Selected event:", event);
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };
   const getevent = () => {
    get_upcoming_event()
        .then((response) => {
          console.log("Resources fetched successfully:", response.data);
          setEvents(response.data);
        })
        .catch((error) => {
          console.error("Error fetching resources:", error);
        });
    };
    useEffect(() => {
      getevent();
    }, []);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("date_from", dateFrom?.toString() || "");
    formData.append("date_to", dateTo?.toString() || "");
    formData.append("image", image);
    
    try {
      const response = await upcoming_event(formData);
      console.log(formData,"Resource upload successful:", response);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <section id="upcomingevents" ref={sectionRef} className="events-section">
      <div className="container">
        <div className="events-header">
          <h2 className="section-title slide-up delay-1">Upcoming Events</h2>
          <p className="section-description slide-up delay-2">
            Stay connected with the latest campus activities and educational opportunities
          </p>
          {isAuthenticated?.authenticated === true && (
            <>
              <Dialog>
                <DialogTrigger className="mb-6 rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark">
                  Add Resource
                </DialogTrigger>
                <DialogContent className="event-dialog">
                  <DialogHeader>
                    <DialogTitle>Add a New Event</DialogTitle>
                    <DialogDescription>
                      Fill in the details below to add a new event.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label
                        htmlFor="Name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Event Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        onChange={(e) => setName(e.target.value)}
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
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="location"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Location
                      </label>
                      <textarea
                        name="location"
                        id="location"
                        onChange={(e) => setLocation(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="dateFrom"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Date From
                      </label>
                      <input
                        type="date"
                        name="date_from"
                        id="date_from"
                        required
                        onChange={(e) => setDateFrom(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-4"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="dateTo"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Date To
                      </label>
                      <input
                        type="date"
                        name="date_to"
                        id="date_to"
                        required
                        onChange={(e) => setDateTo(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-4"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="Upload Image"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Upload Image
                      </label>
                      <input
                        type="file"
                        name="image"
                        id="image"
                        required
                        onChange={(e) => setImage(e.target.files[0])}
                        accept="image/*"
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

        <div className="events-grid">
          {events.map((event) => (
            <Card key={event.id} className="event-card slide-up delay-3">
              <div 
                className="event-image" 
                style={{ backgroundImage: `url(${event.image})` }}
              />
              <CardHeader>
                <CardTitle>{event.name}</CardTitle>
                <CardDescription className="event-date">
                  <CalendarIcon className="event-icon" />
                  {format(event.date_from, "MMM dd, yyyy")}
                  {/* {!isSameDay(event.date_from, event.date_to) && 
                    ` - ${format(event.date_to, "MMM dd, yyyy")}`} */}
                </CardDescription>
                <CardDescription className="event-location">
                  <MapPin className="event-icon" />
                  {event.location}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button 
                  onClick={() => openEventDetails(event)} 
                  className="event-details-btn"
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {selectedEvent && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="event-dialog">
              <DialogHeader>
                <DialogTitle>{selectedEvent.name}</DialogTitle>
                <DialogDescription>
                  Event Details and Venue Information
                </DialogDescription>
              </DialogHeader>
              <div className="event-dialog-content">
                <div 
                  className="event-dialog-image" 
                  style={{ backgroundImage: `url(${selectedEvent.image})` }}
                />
                <div className="event-dialog-details">
                  <div className="event-detail-item">
                    <CalendarIcon className="event-detail-icon" />
                    <div>
                      <h4>Date & Time</h4>
                      <p>
                        {format(selectedEvent.date_from, "MMMM dd, yyyy")}
                        {/* {!isSameDay(selectedEvent.date_from, selectedEvent.date_to) && 
                          ` - ${format(selectedEvent.date_to, "MMMM dd, yyyy")}`} */}
                      </p>
                      <p>9:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                  <div className="event-detail-item">
                    <MapPin className="event-detail-icon" />
                    <div>
                      <h4>Location</h4>
                      <p>{selectedEvent.location}</p>
                    </div>
                  </div>
                </div>
                <div className="event-dialog-description">
                  <h4>Event Description</h4>
                  {selectedEvent.description ? (
                    <p>{selectedEvent.description}</p>
                  ) : (
                    <p>
                    Join us for this exciting event designed to enhance your educational experience. 
                    Network with peers, learn from industry experts, and develop valuable skills that 
                    will benefit your academic and professional journey.
                  </p>
                  )}
                  
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
};

// function isSameDay(date1: Date, date2: Date): boolean {
//   return (
//     date1.getFullYear() === date2.getFullYear() &&
//     date1.getMonth() === date2.getMonth() &&
//     date1.getDate() === date2.getDate()
//   );
// }

export default UpcomingEvents;