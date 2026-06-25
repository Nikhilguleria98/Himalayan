import { useState } from "react";
import { Mail, Pencil, ShieldCheck, User, UserCircle, X, Save, Phone } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { updateProfile } from "../../store/auth-slice/index";

function ProfileField({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-md border p-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-50 text-teal-700">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium text-gray-900">{value || "Not available"}</p>
      </div>
    </div>
  );
}

export default function UserProfilePage() {
  const { user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ userName: "", email: "", phone: "" });
  const [feedback, setFeedback] = useState(null); // { type: 'success'|'error', message }

  const openEdit = () => {
    setFormData({ userName: user?.userName || "", email: user?.email || "", phone: user?.phone || "" });
    setFeedback(null);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setFeedback(null);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!formData.userName.trim() || !formData.email.trim()) {
      setFeedback({ type: "error", message: "Username and email are required." });
      return;
    }
    const result = await dispatch(updateProfile(formData));
    if (updateProfile.fulfilled.match(result)) {
      setFeedback({ type: "success", message: "Profile updated successfully!" });
      setTimeout(() => {
        setIsEditing(false);
        setFeedback(null);
      }, 1500);
    } else {
      setFeedback({
        type: "error",
        message: result.payload?.message || "Update failed. Please try again.",
      });
    }
  };

  return (
    <section className="responsivewidth py-10">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-medium text-teal-700">User Profile</p>
          <h1 className="text-3xl font-semibold text-gray-900">
            {user?.userName || "Traveller"}'s Profile
          </h1>
          <p className="mt-2 text-gray-600">
            Your account details for Himalayan Khadu bookings.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!isEditing && (
            <Button
              variant="outline"
              className="w-fit flex items-center gap-2 border-teal-600 text-teal-700 hover:bg-teal-50"
              onClick={openEdit}
            >
              <Pencil className="h-4 w-4" />
              Edit Profile
            </Button>
          )}
          <Button asChild variant="outline" className="w-fit">
            <Link to="/user-dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>

      <Card className="max-w-3xl rounded-md">
        <CardHeader>
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-md bg-teal-600 text-white">
              <UserCircle className="h-7 w-7" />
            </span>
            <div>
              <CardTitle>{user?.userName || "Traveller"}</CardTitle>
              <CardDescription>{user?.email || "Email not available"}</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* ── Feedback banner ── */}
          {feedback && (
            <div
              className={`rounded-md px-4 py-3 text-sm font-medium ${
                feedback.type === "success"
                  ? "bg-teal-50 text-teal-700 border border-teal-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {feedback.message}
            </div>
          )}

          {isEditing ? (
            /* ── Edit Form ── */
            <div className="space-y-4">
              {/* Username field */}
              <div className="flex items-center gap-4 rounded-md border p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-50 text-teal-700">
                  <User className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <label className="text-sm text-muted-foreground" htmlFor="userName">
                    Username
                  </label>
                  <input
                    id="userName"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-900 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Email field */}
              <div className="flex items-center gap-4 rounded-md border p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-50 text-teal-700">
                  <Mail className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <label className="text-sm text-muted-foreground" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-900 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Phone field */}
              <div className="flex items-center gap-4 rounded-md border p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-50 text-teal-700">
                  <Phone className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <label className="text-sm text-muted-foreground" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-900 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 pt-1">
                <Button
                  className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white"
                  onClick={handleSave}
                  disabled={isLoading}
                >
                  <Save className="h-4 w-4" />
                  {isLoading ? "Saving…" : "Save Changes"}
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={cancelEdit}
                  disabled={isLoading}
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            /* ── Read-only view ── */
            <>
              <ProfileField icon={User} label="Username" value={user?.userName} />
              <ProfileField icon={Mail} label="Email Address" value={user?.email} />
              <ProfileField icon={Phone} label="Phone Number" value={user?.phone} />
              <div className="flex items-center gap-4 rounded-md border p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-50 text-teal-700">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm text-muted-foreground">Account Type</p>
                  <Badge variant="secondary" className="mt-1 capitalize">
                    {user?.role || "user"}
                  </Badge>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
