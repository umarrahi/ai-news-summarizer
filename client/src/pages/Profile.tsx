// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { User, Mail, Calendar, MapPin, Edit2, Save } from "lucide-react";
// import { Link } from "react-router-dom";

// const Profile = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [profileData, setProfileData] = useState({
//     name: "John Doe",
//     email: "john.doe@example.com",
//     location: "New York, USA",
//     joinDate: "January 2024",
//     plan: "Premium",
//     interests: ["Technology", "Business", "Health"]
//   });

//   const handleSave = () => {
//     setIsEditing(false);
//     // Save profile data
//     console.log("Saving profile:", profileData);
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
//         <div className="container mx-auto px-4 py-8">
//           <div className="flex items-center gap-4">
//             <Button variant="outline" asChild>
//               <Link to="/dashboard">← Back to Dashboard</Link>
//             </Button>
//             <h1 className="text-3xl font-bold">Profile</h1>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8 max-w-4xl">
//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Profile Card */}
//           <div className="lg:col-span-1">
//             <Card className="shadow-card">
//               <CardContent className="pt-6 text-center">
//                 <Avatar className="w-24 h-24 mx-auto mb-4">
//                   <AvatarImage src="/placeholder-user.jpg" />
//                   <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
//                     {profileData.name.split(' ').map(n => n[0]).join('')}
//                   </AvatarFallback>
//                 </Avatar>

//                 <h3 className="text-xl font-semibold mb-2">{profileData.name}</h3>
//                 <Badge variant="outline" className="mb-4">
//                   {profileData.plan} Plan
//                 </Badge>

//                 <div className="space-y-2 text-sm text-muted-foreground">
//                   <div className="flex items-center justify-center gap-2">
//                     <Mail className="w-4 h-4" />
//                     {profileData.email}
//                   </div>
//                   <div className="flex items-center justify-center gap-2">
//                     <MapPin className="w-4 h-4" />
//                     {profileData.location}
//                   </div>
//                   <div className="flex items-center justify-center gap-2">
//                     <Calendar className="w-4 h-4" />
//                     Joined {profileData.joinDate}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Interests */}
//             <Card className="shadow-card mt-6">
//               <CardHeader>
//                 <CardTitle className="text-lg">Interests</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex flex-wrap gap-2">
//                   {profileData.interests.map((interest, index) => (
//                     <Badge key={index} variant="secondary">
//                       {interest}
//                     </Badge>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Profile Form */}
//           <div className="lg:col-span-2">
//             <Card className="shadow-card">
//               <CardHeader className="flex flex-row items-center justify-between">
//                 <CardTitle className="text-xl">Personal Information</CardTitle>
//                 <Button
//                   variant={isEditing ? "default" : "outline"}
//                   size="sm"
//                   onClick={isEditing ? handleSave : () => setIsEditing(true)}
//                 >
//                   {isEditing ? (
//                     <>
//                       <Save className="w-4 h-4 mr-2" />
//                       Save Changes
//                     </>
//                   ) : (
//                     <>
//                       <Edit2 className="w-4 h-4 mr-2" />
//                       Edit Profile
//                     </>
//                   )}
//                 </Button>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="firstName">First Name</Label>
//                     <Input
//                       id="firstName"
//                       value={profileData.name.split(' ')[0]}
//                       disabled={!isEditing}
//                       className="rounded-full"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="lastName">Last Name</Label>
//                     <Input
//                       id="lastName"
//                       value={profileData.name.split(' ')[1] || ''}
//                       disabled={!isEditing}
//                       className="rounded-full"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email Address</Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     value={profileData.email}
//                     disabled={!isEditing}
//                     className="rounded-full"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="location">Location</Label>
//                   <Input
//                     id="location"
//                     value={profileData.location}
//                     disabled={!isEditing}
//                     className="rounded-full"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="timezone">Timezone</Label>
//                   <Select disabled={!isEditing}>
//                     <SelectTrigger className="rounded-full">
//                       <SelectValue placeholder="Select timezone" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="est">Eastern Time</SelectItem>
//                       <SelectItem value="cst">Central Time</SelectItem>
//                       <SelectItem value="mst">Mountain Time</SelectItem>
//                       <SelectItem value="pst">Pacific Time</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Newsletter Preferences</Label>
//                   <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-xl">
//                     <label className="flex items-center space-x-2">
//                       <input type="checkbox" defaultChecked disabled={!isEditing} />
//                       <span className="text-sm">Daily summaries</span>
//                     </label>
//                     <label className="flex items-center space-x-2">
//                       <input type="checkbox" defaultChecked disabled={!isEditing} />
//                       <span className="text-sm">Breaking news</span>
//                     </label>
//                     <label className="flex items-center space-x-2">
//                       <input type="checkbox" disabled={!isEditing} />
//                       <span className="text-sm">Weekly digest</span>
//                     </label>
//                     <label className="flex items-center space-x-2">
//                       <input type="checkbox" disabled={!isEditing} />
//                       <span className="text-sm">Product updates</span>
//                     </label>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Subscription Info */}
//             <Card className="shadow-card mt-6">
//               <CardHeader>
//                 <CardTitle className="text-xl">Subscription</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center justify-between p-4 bg-primary-light/20 rounded-xl">
//                   <div>
//                     <h4 className="font-semibold">Premium Plan</h4>
//                     <p className="text-sm text-muted-foreground">
//                       Access to advanced AI summaries and unlimited articles
//                     </p>
//                   </div>
//                   <Button variant="outline" shape="pill">
//                     Manage Plan
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

// client/src/pages/Profile.tsx
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Calendar, Edit2, Save, Lock, EyeOff, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { changePassword, getProfile, updateProfile } from "@/services/api/profile";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<any>({
    name: "",
    email: "",
    joinDate: "",
    plan: "Free",
  });
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Load profile data on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await getProfile();
        setProfileData({
          name: res.user.name,
          email: res.user.email,
          joinDate: new Date(res.user.createdAt).toLocaleDateString(),
          plan: "Premium",
        });
      } catch (err: any) {
        console.error("Error fetching profile:", err);
        toast.error("Failed to load profile.");
      }
    };
    loadProfile();
  }, []);

  // ✅ Save profile changes
  const handleSave = async () => {
    try {
      setLoading(true);
      await updateProfile({
        name: profileData.name,
        email: profileData.email,
      });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Change password
  const handlePasswordUpdate = async () => {
    if (!currentPassword || !password)
      return toast.error("Please enter both current and new passwords.");

    try {
      setLoading(true);
      await changePassword({
        currentPassword,
        newPassword: password,
      });
      toast.success("Password updated successfully!");
      setCurrentPassword("");
      setPassword("");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
        <div className="container mx-auto px-4 py-8 flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link to="/dashboard">← Back to Dashboard</Link>
          </Button>
          <h1 className="text-3xl font-bold">Profile</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl grid lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card className="shadow-card text-center">
            <CardContent className="pt-6">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {profileData.name
                    ? profileData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                    : "?"}
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
                  <Calendar className="w-4 h-4" />
                  Joined {profileData.joinDate}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Personal Information</CardTitle>
              <Button
                variant={isEditing ? "default" : "outline"}
                size="sm"
                disabled={loading}
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4 mr-2" /> Save Changes
                  </>
                ) : (
                  <>
                    <Edit2 className="w-4 h-4 mr-2" /> Edit Profile
                  </>
                )}
              </Button>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  disabled={!isEditing}
                  className="rounded-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  disabled={!isEditing}
                  className="rounded-full"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2">
                <Lock className="w-5 h-5" /> Change Password
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">

                  <Input
                    id="currentPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="rounded-full"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">

                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-full"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button onClick={handlePasswordUpdate} disabled={loading} className="rounded-full">
                Update Password
              </Button>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default Profile;
