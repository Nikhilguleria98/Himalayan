import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  IndianRupee,
  PackageCheck,
  UserCircle,
} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { getAllOrdersByUser } from "../../store/client/order-slice";

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

const getBookingTotal = (order) => order?.totalPayable || order?.totalPrice || 0;

function StatCard({ icon: Icon, label, value }) {
  return (
    <Card className="rounded-md">
      <CardContent className="flex items-center gap-4 pt-0">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-teal-50 text-teal-700">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function UserDashboardPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isLoading, orderList, error } = useSelector((state) => state.clientOrder);

  useEffect(() => {
    if (user?.id) {
      dispatch(getAllOrdersByUser(user.id));
    }
  }, [dispatch, user?.id]);

  const stats = useMemo(() => {
    const confirmed = orderList.filter(
      (order) => order.orderStatus === "Confirmed"
    ).length;
    const pending = orderList.filter(
      (order) => order.orderStatus !== "Confirmed"
    ).length;
    const spent = orderList.reduce(
      (total, order) => total + Number(getBookingTotal(order)),
      0
    );

    return {
      bookings: orderList.length,
      confirmed,
      pending,
      spent,
    };
  }, [orderList]);

  return (
    <section className="responsivewidth py-10">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-medium text-teal-700">User Dashboard</p>
          <h1 className="text-3xl font-semibold text-gray-900">
            Welcome, {user?.userName || "traveller"}
          </h1>
          <p className="mt-2 text-gray-600">
            Track your bookings, payment status, and upcoming Himalayan trips.
          </p>
        </div>
        <Button asChild className="w-fit">
          <Link to="/profile">
            <UserCircle className="h-4 w-4" />
            View Profile
          </Link>
        </Button>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <StatCard icon={PackageCheck} label="Total Bookings" value={stats.bookings} />
        <StatCard icon={CheckCircle2} label="Confirmed" value={stats.confirmed} />
        <StatCard icon={Clock3} label="Processing" value={stats.pending} />
        <StatCard icon={IndianRupee} label="Booked Value" value={formatCurrency(stats.spent)} />
      </div>

      <Card className="rounded-md">
        <CardHeader>
          <CardTitle>My Bookings</CardTitle>
          <CardDescription>Your package bookings and approval status.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Package</TableHead>
                  <TableHead>Travelers</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Booked On</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Loading bookings...
                    </TableCell>
                  </TableRow>
                ) : error && orderList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                      No bookings found yet.
                    </TableCell>
                  </TableRow>
                ) : orderList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                      You have not booked any packages yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  orderList.map((order) => (
                    <TableRow key={order._id}>
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
                          <Badge variant={order.paymentStatus === "Paid" ? "default" : "outline"}>
                            {order.paymentStatus || "Pending"}
                          </Badge>
                          <Badge variant={order.orderStatus === "Confirmed" ? "default" : "secondary"}>
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
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
