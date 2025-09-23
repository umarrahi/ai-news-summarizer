import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Calendar, MapPin, Edit2, Save } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    location: "New York, USA",
    joinDate: "January 2024",
    plan: "Premium",
    interests: ["Technology", "Business", "Health"]
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save profile data
    console.log("Saving profile:", profileData);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/dashboard">← Back to Dashboard</Link>
            </Button>
            <h1 className="text-3xl font-bold">Profile</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="shadow-card">
              <CardContent className="pt-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <h3 className="text-xl font-semibold mb-2">{profileData.name}</h3>
                <Badge variant="outline" className="mb-4">
                  {profileData.plan} Plan
                </Badge>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    {profileData.email}
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {profileData.location}
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Joined {profileData.joinDate}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interests */}
            <Card className="shadow-card mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profileData.interests.map((interest, index) => (
                    <Badge key={index} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">Personal Information</CardTitle>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  size="sm"
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.name.split(' ')[0]}
                      disabled={!isEditing}
                      className="rounded-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.name.split(' ')[1] || ''}
                      disabled={!isEditing}
                      className="rounded-full"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    disabled={!isEditing}
                    className="rounded-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    disabled={!isEditing}
                    className="rounded-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select disabled={!isEditing}>
                    <SelectTrigger className="rounded-full">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="est">Eastern Time</SelectItem>
                      <SelectItem value="cst">Central Time</SelectItem>
                      <SelectItem value="mst">Mountain Time</SelectItem>
                      <SelectItem value="pst">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Newsletter Preferences</Label>
                  <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-xl">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked disabled={!isEditing} />
                      <span className="text-sm">Daily summaries</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked disabled={!isEditing} />
                      <span className="text-sm">Breaking news</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" disabled={!isEditing} />
                      <span className="text-sm">Weekly digest</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" disabled={!isEditing} />
                      <span className="text-sm">Product updates</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Info */}
            <Card className="shadow-card mt-6">
              <CardHeader>
                <CardTitle className="text-xl">Subscription</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-primary-light/20 rounded-xl">
                  <div>
                    <h4 className="font-semibold">Premium Plan</h4>
                    <p className="text-sm text-muted-foreground">
                      Access to advanced AI summaries and unlimited articles
                    </p>
                  </div>
                  <Button variant="outline" shape="pill">
                    Manage Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;