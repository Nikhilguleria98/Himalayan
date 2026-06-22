import { Mail, ShieldCheck, User, UserCircle } from "lucide-react";
import { useSelector } from "react-redux";
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
  const { user } = useSelector((state) => state.auth);

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
        <Button asChild variant="outline" className="w-fit">
          <Link to="/user-dashboard">Back to Dashboard</Link>
        </Button>
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
          <ProfileField icon={User} label="Username" value={user?.userName} />
          <ProfileField icon={Mail} label="Email Address" value={user?.email} />
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
        </CardContent>
      </Card>
    </section>
  );
}
