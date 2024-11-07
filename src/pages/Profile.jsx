import { useState, useEffect } from "react";
import { Navbar } from "@/components/common/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { authService } from "@/services/authService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
    notifications: {
      email: true,
      sms: false,
      push: true
    }
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await authService.getProfile();
      setProfileData(response.data);
    } catch (error) {
      toast({
        title: "Error loading profile",
        description:
          error.response?.data?.message || "Failed to load profile data",
        variant: "destructive"
      });
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await authService.updateProfile(profileData);
      toast({
        title: "Success",
        description: "Profile updated successfully"
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description:
          error.response?.data?.message || "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      await authService.updatePassword(password);
      toast({
        title: "Success",
        description: "Password updated successfully"
      });
      setPassword({ current: "", new: "", confirm: "" });
    } catch (error) {
      toast({
        title: "Update failed",
        description:
          error.response?.data?.message || "Failed to update password",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await authService.deleteAccount();
      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted"
      });
      window.location.href = "/";
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to delete account",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={profileData.avatar || "https://github.com/shadcn.png"}
                />
                <AvatarFallback>
                  {profileData.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase() || "JD"}
                </AvatarFallback>
              </Avatar>

              <div>
                <h2 className="text-2xl font-bold">{profileData.name}</h2>
                <p className="text-muted-foreground">{profileData.email}</p>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="general" className="w-full">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="danger" className="text-red-500">
                Danger Zone
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            name: e.target.value
                          })
                        }
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            email: e.target.value
                          })
                        }
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <Input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            phone: e.target.value
                          })
                        }
                        disabled={loading}
                      />
                    </div>

                    <Button type="submit" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handlePasswordUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Current Password</Label>
                      <Input
                        type="password"
                        value={password.current}
                        onChange={(e) =>
                          setPassword({ ...password, current: e.target.value })
                        }
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>New Password</Label>
                      <Input
                        type="password"
                        value={password.new}
                        onChange={(e) =>
                          setPassword({ ...password, new: e.target.value })
                        }
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Confirm New Password</Label>
                      <Input
                        type="password"
                        value={password.confirm}
                        onChange={(e) =>
                          setPassword({ ...password, confirm: e.target.value })
                        }
                        disabled={loading}
                      />
                    </div>

                    <Button type="submit" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Update Password"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email notifications about your account
                        </p>
                      </div>
                      <Switch
                        checked={profileData.notifications.email}
                        onCheckedChange={(checked) =>
                          setProfileData({
                            ...profileData,
                            notifications: {
                              ...profileData.notifications,
                              email: checked
                            }
                          })
                        }
                        disabled={loading}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive SMS alerts for important updates
                        </p>
                      </div>
                      <Switch
                        checked={profileData.notifications.sms}
                        onCheckedChange={(checked) =>
                          setProfileData({
                            ...profileData,
                            notifications: {
                              ...profileData.notifications,
                              sms: checked
                            }
                          })
                        }
                        disabled={loading}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive push notifications in your browser
                        </p>
                      </div>
                      <Switch
                        checked={profileData.notifications.push}
                        onCheckedChange={(checked) =>
                          setProfileData({
                            ...profileData,
                            notifications: {
                              ...profileData.notifications,
                              push: checked
                            }
                          })
                        }
                        disabled={loading}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="danger">
              <Card className="border-red-500">
                <CardHeader>
                  <CardTitle className="text-red-500">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="rounded-lg border border-red-500 p-4">
                      <h3 className="text-lg font-semibold text-red-500 mb-2">
                        Delete Account
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Once you delete your account, there is no going back.
                        Please be certain.
                      </p>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">Delete Account</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your account and remove your
                              data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDeleteAccount}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Delete Account
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
