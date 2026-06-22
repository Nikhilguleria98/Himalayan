import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CalendarDays, CheckCircle2, IndianRupee, PackageCheck, Users } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { DashboardHeader } from "../../../components/Dashboard/dashboardHeader";
import { DashboardShell } from "../../../components/Dashboard/dashboardShell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  approveBookingForAdmin,
  getAllUsersWithBookingsForAdmin,
} from "../../../store/admin/order-slice";

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

function SummaryStat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-md border bg-background p-4">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default function AdminUsersPage() {
  const dispatch = useDispatch();
  const { isLoading, isUpdating, userList, error } = useSelector(
    (state) => state.adminOrder
  );

  useEffect(() => {
    dispatch(getAllUsersWithBookingsForAdmin());
  }, [dispatch]);

  const stats = useMemo(() => {
    const bookings = userList.flatMap((user) => user.orders || []);
    const revenue = bookings.reduce(
      (total, order) => total + Number(getBookingTotal(order)),
      0
    );

    return {
      users: userList.length,
      bookings: bookings.length,
      revenue,
    };
  }, [userList]);

  const handleApproveBooking = (orderId) => {
    dispatch(approveBookingForAdmin(orderId));
  };

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Admin Panel"
        text="View registered users and the packages they booked."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <SummaryStat icon={Users} label="Total Users" value={stats.users} />
        <SummaryStat
          icon={PackageCheck}
          label="Total Bookings"
          value={stats.bookings}
        />
        <SummaryStat
          icon={IndianRupee}
          label="Booked Value"
          value={formatCurrency(stats.revenue)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Package Booked</TableHead>
              <TableHead>Travelers</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Booked On</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Loading admin data...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-destructive">
                  {error}
                </TableCell>
              </TableRow>
            ) : userList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              userList.map((user) => {
                const orders = user.orders || [];

                if (orders.length === 0) {
                  return (
                    <TableRow key={user._id}>
                      <TableCell>
                        <div className="font-medium">{user.userName}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        No package booked
                      </TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>{formatCurrency(0)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">No bookings</Badge>
                      </TableCell>
                      <TableCell>{formatDate(user.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline" disabled>
                          Approve
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                }

                return orders.map((order, index) => {
                  const isApproved = order.orderStatus === "Confirmed";

                  return (
                    <TableRow key={order._id}>
                      <TableCell>
                        {index === 0 ? (
                          <>
                            <div className="font-medium">{user.userName}</div>
                            <div className="text-sm text-muted-foreground">
                              {user.email}
                            </div>
                          </>
                        ) : (
                          <span className="text-muted-foreground">
                            Additional booking
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="max-w-[260px]">
                        <div className="truncate font-medium">{getPackageTitle(order)}</div>
                        <div className="text-sm text-muted-foreground">
                          Qty: {order.quantity || order.travelers?.length || 1}
                        </div>
                      </TableCell>
                      <TableCell>{order.travelers?.length || order.quantity || 0}</TableCell>
                      <TableCell>{formatCurrency(getBookingTotal(order))}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          <Badge
                            variant={
                              order.paymentStatus === "Paid" ? "default" : "outline"
                            }
                          >
                            {order.paymentStatus || "Pending"}
                          </Badge>
                          <Badge variant={isApproved ? "default" : "secondary"}>
                            {order.orderStatus || "Processing"}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-muted-foreground" />
                          {formatDate(order.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant={isApproved ? "secondary" : "default"}
                          disabled={isApproved || isUpdating}
                          onClick={() => handleApproveBooking(order._id)}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          {isApproved ? "Approved" : "Approve"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                });
              })
            )}
          </TableBody>
        </Table>
      </div>
    </DashboardShell>
  );
}
