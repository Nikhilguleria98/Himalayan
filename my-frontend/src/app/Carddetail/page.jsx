import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../../lib/api";

// Premium Components
import HeroSection from "../../components/package/HeroSection";
import ImageGallery from "../../components/package/ImageGallery";
import BookingCard from "../../components/package/BookingCard";
import PackageHighlights from "../../components/package/PackageHighlights";
import AboutJourney from "../../components/package/AboutJourney";
import WhyChooseTrip from "../../components/package/WhyChooseTrip";
import IncludedExcluded from "../../components/package/IncludedExcluded";
import ItineraryTimeline from "../../components/package/ItineraryTimeline";
import PlacesToVisit from "../../components/package/PlacesToVisit";
import ThingsToDo from "../../components/package/ThingsToDo";
import TravelInformation from "../../components/package/TravelInformation";
import HowToReach from "../../components/package/HowToReach";
import FAQSection from "../../components/package/FAQSection";
import ReviewsSection from "../../components/package/ReviewsSection";
import TripStatistics from "../../components/package/TripStatistics";
import RelatedPackages from "../../components/package/RelatedPackages";
import CTASection from "../../components/package/CTASection";
import { getAllOrdersByUser } from "../../store/client/order-slice";

// ─── Preserved Business Logic ─────────────────────────────────────────────────
const initialTraveler = { name: "", age: "", gender: "Male" };

// ─── Skeleton Loader ──────────────────────────────────────────────────────────
function SkeletonLoader() {
  return (
    <div className="animate-pulse">
      <div className="h-[70vh] w-full bg-gray-200" />
      <div className="responsivewidth py-6">
        <div className="grid h-[400px] grid-cols-4 gap-2 overflow-hidden rounded-2xl">
          <div className="col-span-2 row-span-2 bg-gray-200" />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-200" />
          ))}
        </div>
      </div>
      <div className="responsivewidth py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 rounded-2xl bg-gray-200" />
            ))}
          </div>
          <div className="h-[600px] rounded-2xl bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PackageDetail() {
  // ── All original state preserved ──
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { orderList } = useSelector((state) => state.clientOrder);

  const [trip, setTrip] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");
  const [traveler, setTraveler] = useState(initialTraveler);
  const [quantity, setQuantity] = useState(1);
  const [isBooking, setIsBooking] = useState(false);

  const bookingRef = useRef(null);

  // ── Original fetch logic ──
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      dispatch(getAllOrdersByUser(user.id));
    }
  }, [dispatch, isAuthenticated, user?.id]);

  useEffect(() => {
    async function fetchTrip() {
      try {
        setIsLoading(true);
        setError("");
        const response = await fetch(`${API_BASE_URL}/api/client/package/get/${id}`);
        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.message || "Package not found");
        }
        setTrip(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTrip();
  }, [id]);

  // ── Original price calculation ──
  const pricePerPerson = useMemo(
    () => Number(trip?.salePrice || trip?.price || 0),
    [trip]
  );
  const totalPrice = pricePerPerson * Number(quantity || 1);
  const isPackageBooked = useMemo(() => {
    if (!isAuthenticated || !user?.id || !trip?._id) return false;

    return (orderList || []).some((order) => {
      const packageId =
        order?.tourPackageId?._id || order?.tourPackageId || order?.tourPackageSnapshot?._id;
      return String(packageId) === String(trip._id);
    });
  }, [isAuthenticated, orderList, trip?._id, user?.id]);

  // ── Original booking handler ──
  async function handleBooking(event) {
    event.preventDefault();
    setBookingMessage("");
    if (!isAuthenticated || !user?.id) {
      navigate("/Login");
      return;
    }

    if (isPackageBooked) {
      setBookingMessage("You already booked this package.");
      return;
    }
    try {
      setIsBooking(true);
      const response = await fetch(`${API_BASE_URL}/api/client/orders/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          tourPackageId: trip._id,
          quantity: Number(quantity),
          travelers: [{ ...traveler, age: Number(traveler.age) }],
          totalPrice,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || data.error || "Booking failed");
      }
      setTraveler(initialTraveler);
      setQuantity(1);
      setBookingMessage("Booking request sent. Admin will approve or cancel it soon.");
    } catch (err) {
      setBookingMessage(err.message);
    } finally {
      setIsBooking(false);
    }
  }

  function scrollToBooking() {
    bookingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (isLoading) return <SkeletonLoader />;

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl">⚠️</div>
        <h2 className="text-xl font-bold text-gray-800">Package Not Found</h2>
        <p className="max-w-md text-gray-500">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-2 rounded-xl bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const gallery = trip.gallery?.length ? trip.gallery : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-white"
    >
      {/* ── Hero ── */}
      <HeroSection
        trip={trip}
        pricePerPerson={pricePerPerson}
        onBookNow={scrollToBooking}
        onViewGallery={() =>
          document.getElementById("gallery-section")?.scrollIntoView({ behavior: "smooth" })
        }
      />

      {/* ── Gallery ── */}
      <div id="gallery-section">
        <ImageGallery gallery={gallery} />
      </div>

      {/* ════════════════════════════════════════════════════════
          TWO-COLUMN STICKY LAYOUT
          Left  → all content sections
          Right → sticky booking card (always visible on desktop)
          ════════════════════════════════════════════════════════ */}
      <div className="responsivewidth px-3 py-6 sm:px-4 lg:px-0 lg:py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">

          {/* ── LEFT: Main Content Column ── */}
          <div className="min-w-0 flex-1">

            {/* Package Highlights */}
            <PackageHighlights trip={trip} embedded />

            {/* About the Journey */}
            <div className="mt-8">
              <AboutJourney trip={trip} embedded />
            </div>

            {/* Why Choose This Trip */}
            <div className="mt-8">
              <WhyChooseTrip embedded />
            </div>

            {/* Included & Excluded */}
            <div className="mt-8">
              <IncludedExcluded
                inclusions={trip.inclusions}
                exclusions={trip.exclusions}
                embedded
              />
            </div>

            {/* Itinerary Timeline */}
            <div className="mt-8">
              <ItineraryTimeline itinerary={trip.itinerary} embedded />
            </div>

            {/* Places To Visit */}
            <div className="mt-8">
              <PlacesToVisit
                placesToVisit={trip.placesToVisit}
                gallery={gallery}
                embedded
              />
            </div>

            {/* Things To Do */}
            <div className="mt-8">
              <ThingsToDo thingsToDo={trip.thingsToDo} embedded />
            </div>

            {/* Travel Information */}
            <div className="mt-8">
              <TravelInformation bestTimeToVisit={trip.bestTimeToVisit} embedded />
            </div>

            {/* How To Reach */}
            <div className="mt-8">
              <HowToReach howToReach={trip.howToReach} embedded />
            </div>

            {/* FAQ */}
            <div className="mt-8">
              <FAQSection faq={trip.faq} embedded />
            </div>

          </div>

          {/* ── RIGHT: Sticky Booking Card ── */}
          {/* 
            Key: 
            - `self-start` stops the column from stretching full-height
            - `lg:sticky lg:top-[96px]` makes it stick below the navbar
            - The left column must be taller for sticky to work (it will be)
          */}
          <div
            ref={bookingRef}
            className="w-full shrink-0 lg:w-[380px] lg:self-start lg:sticky lg:top-[55px]"
          >
            <BookingCard
              trip={trip}
              traveler={traveler}
              setTraveler={setTraveler}
              quantity={quantity}
              setQuantity={setQuantity}
              pricePerPerson={pricePerPerson}
              totalPrice={totalPrice}
              isBooking={isBooking}
              isAlreadyBooked={isPackageBooked}
              bookingMessage={bookingMessage}
              handleBooking={handleBooking}
            />
          </div>
        </div>
      </div>

      {/* ── Full-width sections below the two-column area ── */}

      {/* Customer Reviews */}
      <ReviewsSection tripId={trip?._id} />

      {/* Trip Statistics */}
      <TripStatistics />

      {/* Related Packages */}
      <RelatedPackages />

      {/* CTA */}
      <CTASection onBookNow={scrollToBooking} />
    </motion.div>
  );
} 
