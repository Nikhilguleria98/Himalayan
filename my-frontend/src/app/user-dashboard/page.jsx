import { Fragment, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
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

const getPackageDetails = (order) => {
  const snapshot = order?.tourPackageSnapshot || {};
  const packageInfo = order?.tourPackageId || {};
  const inclusions = Array.isArray(snapshot?.inclusions)
    ? snapshot.inclusions
    : Array.isArray(packageInfo?.inclusions)
      ? packageInfo.inclusions
      : [];
  const itinerary = Array.isArray(snapshot?.itinerary)
    ? snapshot.itinerary
    : Array.isArray(packageInfo?.itinerary)
      ? packageInfo.itinerary
      : [];

  return {
    title: snapshot?.title || packageInfo?.title || "Package unavailable",
    description:
      snapshot?.description || packageInfo?.description || "No additional package details are available yet.",
    duration: snapshot?.duration || packageInfo?.duration || "Duration not specified",
    pickDrop: snapshot?.pickDrop || packageInfo?.pickDrop || "Pickup and drop details will be shared soon.",
    pricePerPerson:
      snapshot?.pricePerPerson || packageInfo?.salePrice || packageInfo?.price || 0,
    inclusions,
    itinerary,
  };
};

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
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { isLoading, orderList, error } = useSelector((state) => state.clientOrder);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const userId = user?.id || user?._id;

  useEffect(() => {
    if (userId) {
      dispatch(getAllOrdersByUser(userId));
    }
  }, [dispatch, userId]);

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
          <div className="w-full overflow-hidden rounded-md border">
            <Table className="w-full table-fixed text-sm">
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
                  orderList.map((order) => {
                    const details = getPackageDetails(order);
                    const isExpanded = expandedOrderId === order._id;

                    return (
                      <Fragment key={order._id}>
                        <TableRow>
                          <TableCell className="break-words align-top">
                            <div className="break-words font-medium">{getPackageTitle(order)}</div>
                            <div className="mt-2 text-sm text-muted-foreground">
                              Qty: {order.quantity || order.travelers?.length || 1}
                            </div>
                            <div className="mt-3">
                              <button
                                type="button"
                                className="inline-flex items-center gap-1 text-sm font-semibold text-teal-700 underline-offset-2 hover:underline"
                                onClick={() => {
                                  const packageId = order?.tourPackageId?._id || order?.tourPackageId || order?.tourPackageSnapshot?._id;
                                  if (packageId) {
                                    navigate(`/package/${packageId}`);
                                  }
                                }}
                              >
                                Open full package page
                              </button>
                            </div>
                          </TableCell>
                          <TableCell className="break-words align-top">{order.travelers?.length || order.quantity || 0}</TableCell>
                          <TableCell className="break-words align-top">{formatCurrency(getBookingTotal(order))}</TableCell>
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
                          <TableCell className="break-words align-top">
                            <div className="flex items-center gap-2">
                              <CalendarDays className="h-4 w-4 text-muted-foreground" />
                              {formatDate(order.createdAt)}
                            </div>
                          </TableCell>
                        </TableRow>
                        {isExpanded ? (
                          <TableRow>
                            <TableCell colSpan={5} className="bg-slate-50 p-0">
                              <div className="max-w-full overflow-hidden rounded-b-md border-t border-teal-100 bg-white p-3 sm:p-4">
                                <div className="grid max-w-full gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                                  <div className="min-w-0">
                                    <p className="text-sm font-semibold text-gray-900">Package overview</p>
                                    <p className="mt-2 text-sm leading-6 text-gray-600">{details.description}</p>
                                    <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-700">
                                      <span className="rounded-full bg-teal-50 px-2.5 py-1">
                                        Duration: {details.duration}
                                      </span>
                                      <span className="rounded-full bg-teal-50 px-2.5 py-1">
                                        Pickup: {details.pickDrop}
                                      </span>
                                      <span className="rounded-full bg-teal-50 px-2.5 py-1">
                                        Price/person: {formatCurrency(details.pricePerPerson)}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-sm font-semibold text-gray-900">What&apos;s included</p>
                                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                                      {details.inclusions.length > 0 ? (
                                        details.inclusions.slice(0, 3).map((item, index) => {
                                          const text = typeof item === "string" ? item : item?.text || "";
                                          return <li key={`${order._id}-${index}`} className="flex gap-2"><span className="text-teal-600">•</span><span className="break-words">{text}</span></li>;
                                        })
                                      ) : (
                                        <li>No inclusion details were saved for this package.</li>
                                      )}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : null}
                      </Fragment>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
