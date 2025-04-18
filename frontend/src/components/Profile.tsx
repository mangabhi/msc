import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, MapPin } from "lucide-react";
import Header from "@/components/Header";
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
import Footer from "@/components/Footer";
import "../components/styles/Profile.css";
import { update_profile, get_profile, is_authenticated } from "../endpoints/api"


interface ProfilePageProps {
  user?: {
    name: string;
    role: string;
    avatar?: string;
    university?: string;
    location?: string;
    bio?: string;
    interests?: string[];
    connections?: number;
    joinedDate?: string;
  };
}
interface UserProfile {
  id: number;
  profile_picture: string;
  name: string;
  address: string;
  designation: string;
  description: string;
  [key: string]: any;
}
const exampleUser: UserProfile = {
  id: 1,
  profile_picture: "http://127.0.0.1:8000/media/profile/photo-1721322800607-8c38375eef04_zVzj0DR.jpg",
  name: "Abhishek",
  address: "Banglore, India",
  designation: "Sr Frontend Developer",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
};
const defaultUser = {
  name: "Alex Johnson",
  role: "Computer Science Major",
  university: "Stanford University",
  location: "San Francisco, CA",
  bio: "Passionate about technology and programming. Currently focusing on artificial intelligence and machine learning algorithms.",
  interests: ["Machine Learning", "Web Development", "Algorithms", "Data Science"],
  connections: 78,
  joinedDate: "August 2023"
};

const ProfilePage = ({ user = defaultUser }: ProfilePageProps) => {
  const [profile, setProfile] = useState<Partial<UserProfile>>({});
  const [isAuthenticated, setIsAuthenticated] = useState<{ authenticated: boolean, is_superuser: boolean } | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [address, setAddress] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const [interests, setInterests] = useState<string[]>([]);
  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      try {
        const response = await is_authenticated(); // Call the API
        setIsAuthenticated(response); // Update state based on response
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuth();
  }, [profile]);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await get_profile();
        if (profileData) {
          setProfile(profileData);
          setName(profileData.name || "");
          setDescription(profileData.description || "");
          setFile(profileData.profile_picture || null);
          setAddress(profileData.address || "");
          setDesignation(profileData.designation || "");
          setInterests(
            Array.isArray(profileData?.interests)
              ? profileData.interests
              : profileData?.interests?.split(",").map((interest) => interest.trim()) || []
          );
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("designation", designation);
    formData.append("interests", JSON.stringify(interests));
    if (file) {
      formData.append("profile_picture", file);
    }
    try {
      const response = await update_profile(formData);
      console.log("Resource upload successful:", response);
      // Optionally, you can refresh the profile data after a successful update
      const updatedProfile = await get_profile();
    if (updatedProfile) {
      setProfile(updatedProfile);
      setName(updatedProfile.name || "");
      setDescription(updatedProfile.description || "");
      setFile(updatedProfile.profile_picture || null);
      setAddress(updatedProfile.address || "");
      setDesignation(updatedProfile.designation || "");
      setInterests(
        Array.isArray(updatedProfile?.interests)
          ? updatedProfile.interests
          : updatedProfile?.interests?.split(",").map((interest) => interest.trim()) || []
      );
    }

    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="app">
      <Header />
      <main>
        <section className="profile-section">
          <div className="profile-container" style={{ width: "100%" }}>
            <Card className="profile-card" style={{ width: "100%" }}>
              <div className="profile-cover-image" />

              <CardHeader className="profile-header">
                <div className="profile-avatar-wrapper">
                  <Avatar className="profile-avatar">
                      <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                   </Avatar>
                </div>

                <div className="profile-title-block">
                  <h2 className="profile-name">{profile.name}</h2>
                  <p className="profile-role">{profile.designation}</p>

                  {user.university && (
                    <div className="profile-university">
                      <span>{profile.university}</span>
                    </div>
                  )}

                  {profile.address && (
                    <div className="profile-location">
                      <MapPin className="profile-icon" size={14} />
                      <span>{profile.address}</span>
                    </div>
                  )}
                </div>

                <div className="profile-actions">
                  {isAuthenticated?.authenticated === true && (
                    <>
                      <Dialog>
                        <DialogTrigger className="mb-6 rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark flex items-center">
                          <Edit className="mr-2" size={16} />
                          <span>Edit</span>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Profile</DialogTitle>
                            <DialogDescription>
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                              <label
                                htmlFor="Name"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                name="name"
                                id="name"
                                value={name}
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
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
                              />
                            </div>
                            <div className="mb-4">
                              <label
                                htmlFor="Profile Upload"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Profile Upload
                              </label>
                              <input
                                type="file"
                                name="profile_picture"
                                id="profile_picture"
                                onChange={(e) => setFile(e.target.files[0] || null)}
                                accept="image/*"
                                className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                              />
                            </div>
                            <div className="mb-4">
                              <label
                                htmlFor="Address"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Address
                              </label>
                              <input
                                type="text"
                                name="address"
                                id="address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-4"
                              />
                            </div>
                            <div className="mb-4">
                              <label
                                htmlFor="Designation"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Designation
                              </label>
                              <input
                                type="text"
                                name="designation"
                                id="designation"
                                value={designation}
                                required
                                onChange={(e) => setDesignation(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-4"
                              />
                            </div>
                            <div className="mb-4">
                              <label
                                htmlFor="Interests"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Interests
                              </label>
                              <input
                                type="text"
                                name="interests"
                                id="interests"
                                value={Array.isArray(interests) ? interests.join(",") : ""}
                                required
                                onChange={(e) => setInterests(e.target.value.split(","))}
                                placeholder="Enter interests separated by commas"
                                className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-4"
                              />
                            </div>
                            <DialogFooter>
                              <DialogClose
                                type="submit"
                                className="rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark"
                              >
                                Update
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
              </CardHeader>

              <CardContent className="profile-content">
                {profile.description && (
                  <div className="profile-bio">
                    <h3 className="profile-section-title">About</h3>
                    <p>{profile.description}</p>
                  </div>
                )}

                {interests && interests.length > 0 && (
                  <div className="profile-interests">
                    <h3 className="profile-section-title">Interests</h3>
                    <div className="profile-badges">
                      {interests.map((interest, index) => (
                        <Badge key={index} variant="secondary" className="profile-badge">
                          {interest.trim()} {/* Trim to remove extra spaces */}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>

              <CardFooter className="profile-footer">
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;