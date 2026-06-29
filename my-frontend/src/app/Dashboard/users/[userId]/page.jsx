import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  IndianRupee,
  Mail,
  PackageCheck,
  ShieldCheck,
  UserCircle,
  Users,
  Phone,
} from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { DashboardHeader } from "../../../../components/Dashboard/dashboardHeader";
import { DashboardShell } from "../../../../components/Dashboard/dashboardShell";
import {
  getUserDetailForAdmin,
  approveBookingForAdmin,
} from "../../../../store/admin/order-slice";

/* ─── helpers ─── */
const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount || 0));

const formatDate = (dateString) => {
  if (!dateString) return "Not available";
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getPackageTitle = (order) =>
  order?.tourPackageSnapshot?.title ||
  order?.tourPackageId?.title ||
  "Package unavailable";

const getBookingTotal = (order) =>
  order?.totalPayable || order?.totalPrice || 0;

/* ─── Stat card ─── */
function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div className="rounded-xl border bg-white p-4 sm:p-5 shadow-sm flex items-center gap-4 min-w-0">
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${accent}`}
      >
        <Icon className="h-6 w-6" />
      </span>
      <div className="min-w-0 flex-1 overflow-hidden">
        <p className="text-sm text-muted-foreground font-medium truncate">{label}</p>
        <p className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{value}</p>
      </div>
    </div>
  );
}

/* ─── Info row ─── */
function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3.5 rounded-lg border bg-gray-50 p-3.5 sm:p-4 min-w-0 w-full shadow-xs">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-teal-50 text-teal-700">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1 overflow-hidden">
        <p className="text-xs text-muted-foreground font-medium truncate">{label}</p>
        <div
          className="text-sm font-semibold text-gray-900 truncate tracking-tight"
          title={typeof value === "string" ? value : undefined}
        >
          {value || "—"}
        </div>
      </div>
    </div>
  );
}

/* ─── Main page ─── */
export default function AdminUserDetailPage() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isUpdating, selectedUser, error } = useSelector(
    (state) => state.adminOrder
  );

  useEffect(() => {
    if (userId) dispatch(getUserDetailForAdmin(userId));
  }, [dispatch, userId]);

  const handleApprove = (orderId) => {
    dispatch(approveBookingForAdmin(orderId));
  };

  /* ── computed stats ── */
  const orders = selectedUser?.orders || [];
  const confirmedCount = orders.filter((o) => o.orderStatus === "Confirmed").length;
  const totalValue = orders.reduce((sum, o) => sum + Number(getBookingTotal(o)), 0);

  /* ── loading / error states ── */
  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex h-64 items-center justify-center text-muted-foreground">
          Loading user details…
        </div>
      </DashboardShell>
    );
  }

  if (error || !selectedUser) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <p className="text-destructive font-medium">
            {error || "User not found."}
          </p>
          <Button variant="outline" onClick={() => navigate("/Dashboard/users")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Button>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="User Detail"
        text="Complete profile and booking history for this user."
      >
        <Button
          variant="outline"
          onClick={() => navigate("/Dashboard/users")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Users
        </Button>
      </DashboardHeader>

      {/* ── User profile card ── */}
      <Card className="rounded-xl shadow-sm overflow-hidden">
        <CardHeader>
          <div className="flex items-center gap-4 sm:gap-5 min-w-0">
            <span className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white shadow">
              <UserCircle className="h-8 w-8 sm:h-9 sm:w-9" />
            </span>
            <div className="min-w-0 flex-1 overflow-hidden">
              <CardTitle className="text-lg sm:text-xl truncate">{selectedUser.userName}</CardTitle>
              <CardDescription className="text-sm sm:text-base truncate">{selectedUser.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <InfoRow icon={Mail} label="Email Address" value={selectedUser.email} />
            <InfoRow icon={Phone} label="Phone Number" value={selectedUser.phone} />
            <InfoRow
              icon={ShieldCheck}
              label="Account Type"
              value={
                <Badge variant="secondary" className="capitalize mt-0.5">
                  {selectedUser.role || "user"}
                </Badge>
              }
            />
            <InfoRow
              icon={CalendarDays}
              label="Member Since"
              value={formatDate(selectedUser.createdAt)}
            />
          </div>
        </CardContent>
      </Card>

      {/* ── Booking stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <StatCard
          icon={PackageCheck}
          label="Total Bookings"
          value={orders.length}
          accent="bg-blue-50 text-blue-600"
        />
        <StatCard
          icon={CheckCircle2}
          label="Confirmed"
          value={confirmedCount}
          accent="bg-teal-50 text-teal-600"
        />
        <StatCard
          icon={IndianRupee}
          label="Total Value"
          value={formatCurrency(totalValue)}
          accent="bg-amber-50 text-amber-600"
        />
      </div>

      {/* ── Bookings table ── */}
      <div className="mt-6 rounded-xl border shadow-sm overflow-hidden bg-white">
        <div className="bg-gray-50 px-5 py-3 border-b">
          <h2 className="font-semibold text-gray-800 flex items-center gap-2">
            <Users className="h-4 w-4 text-teal-600" />
            Booking History
          </h2>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-white">
                <TableHead>#</TableHead>
                <TableHead>Package</TableHead>
                <TableHead>Travelers</TableHead>
                <TableHead>Traveler Names</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Booked On</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                    No bookings found for this user.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order, idx) => {
                  const isConfirmed = order.orderStatus === "Confirmed";
                  const travelerNames = order.travelers?.map((t) => t.name).join(", ");

                  return (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium text-muted-foreground">
                        {idx + 1}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium max-w-[200px] truncate">
                          {getPackageTitle(order)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {order.travelers?.length || order.quantity || 0}
                      </TableCell>
                      <TableCell className="max-w-[180px]">
                        <p className="truncate text-sm text-muted-foreground">
                          {travelerNames || "—"}
                        </p>
                      </TableCell>
                      <TableCell className="font-semibold">
                        {formatCurrency(getBookingTotal(order))}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={order.paymentStatus === "Paid" ? "default" : "outline"}
                        >
                          {order.paymentStatus || "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={isConfirmed ? "default" : "secondary"}>
                          {order.orderStatus || "Processing"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {formatDate(order.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant={isConfirmed ? "secondary" : "default"}
                          disabled={isConfirmed || isUpdating}
                          onClick={() => handleApprove(order._id)}
                          className={
                            !isConfirmed
                              ? "bg-teal-600 hover:bg-teal-700 text-white"
                              : ""
                          }
                        >
                          <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                          {isConfirmed ? "Approved" : "Approve"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardShell>
  );
}
