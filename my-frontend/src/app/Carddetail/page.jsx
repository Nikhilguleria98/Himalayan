import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowLeft, CalendarDays, CheckCircle2, MapPin, Users } from "lucide-react";
import { API_BASE_URL } from "../../lib/api";

const initialTraveler = {
  name: "",
  age: "",
  gender: "Male",
};

const hasText = (value) => Boolean(String(value || "").trim());

const DetailSection = ({ title, children }) => (
  <section className="rounded-lg border bg-white p-6 shadow-sm">
    <h2 className="text-2xl font-bold">{title}</h2>
    <div className="mt-4">{children}</div>
  </section>
);

const TextList = ({ items, getText }) => {
  const visibleItems = (items || []).filter((item) => hasText(getText(item)));

  if (!visibleItems.length) {
    return <p className="text-gray-600">Details coming soon.</p>;
  }

  return (
    <div className="grid gap-2">
      {visibleItems.map((item, index) => (
        <span
          key={item._id || `${getText(item)}-${index}`}
          className="flex items-start gap-2 text-gray-700"
        >
          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-teal-600" />
          {getText(item)}
        </span>
      ))}
    </div>
  );
};

const InfoCards = ({ items, titleKey, descKey }) => {
  const visibleItems = (items || []).filter(
    (item) => hasText(item?.[titleKey]) || hasText(item?.[descKey])
  );

  if (!visibleItems.length) {
    return <p className="text-gray-600">Details coming soon.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {visibleItems.map((item, index) => (
        <article key={item._id || index} className="rounded-md bg-gray-50 p-4">
          {hasText(item?.[titleKey]) && (
            <h3 className="font-semibold text-gray-900">{item[titleKey]}</h3>
          )}
          {hasText(item?.[descKey]) && (
            <p className="mt-2 leading-6 text-gray-700">{item[descKey]}</p>
          )}
        </article>
      ))}
    </div>
  );
};

export default function PackageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [trip, setTrip] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");
  const [traveler, setTraveler] = useState(initialTraveler);
  const [quantity, setQuantity] = useState(1);
  const [isBooking, setIsBooking] = useState(false);

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

  const pricePerPerson = useMemo(
    () => Number(trip?.salePrice || trip?.price || 0),
    [trip]
  );
  const totalPrice = pricePerPerson * Number(quantity || 1);

  async function handleBooking(event) {
    event.preventDefault();
    setBookingMessage("");

    if (!isAuthenticated || !user?.id) {
      navigate("/Login");
      return;
    }

    try {
      setIsBooking(true);
      const response = await fetch(`${API_BASE_URL}/api/client/orders/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          tourPackageId: trip._id,
          quantity: Number(quantity),
          travelers: [
            {
              ...traveler,
              age: Number(traveler.age),
            },
          ],
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

  if (isLoading) {
    return <div className="py-24 text-center">Loading package...</div>;
  }

  if (error) {
    return <div className="py-24 text-center text-red-600">{error}</div>;
  }

  const gallery = trip.gallery?.length ? trip.gallery : ["/placeholder.svg"];

  return (
    <div className="responsivewidth py-10">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <section>
          <img
            src={gallery[0]}
            alt={trip.title}
            className="h-[420px] w-full rounded-lg object-cover"
          />
          {gallery.length > 1 && (
            <div className="mt-4 grid grid-cols-3 gap-3">
              {gallery.slice(1, 4).map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt={`${trip.title} ${index + 2}`}
                  className="h-28 w-full rounded-md object-cover"
                />
              ))}
            </div>
          )}
        </section>

        <aside className="rounded-lg border bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-teal-600">Travel Package</p>
          <h1 className="mt-2 text-3xl font-bold">{trip.title}</h1>
          <div className="mt-4 grid gap-3 text-sm text-gray-700">
            <span className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-teal-600" />
              {trip.duration || "Duration available on request"}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-teal-600" />
              {trip.pickDrop || "Pickup and drop details available on request"}
            </span>
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4 text-teal-600" />
              Private and group bookings
            </span>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-500">From</p>
            <p className="text-3xl font-bold text-teal-600">
              {pricePerPerson > 0
                ? `Rs. ${pricePerPerson.toLocaleString("en-IN")}`
                : "Price on request"}
            </p>
          </div>

          <form onSubmit={handleBooking} className="mt-6 grid gap-3">
            <input
              required
              value={traveler.name}
              onChange={(event) =>
                setTraveler((prev) => ({ ...prev, name: event.target.value }))
              }
              placeholder="Traveler name"
              className="rounded-md border px-3 py-2"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                required
                min="1"
                type="number"
                value={traveler.age}
                onChange={(event) =>
                  setTraveler((prev) => ({ ...prev, age: event.target.value }))
                }
                placeholder="Age"
                className="rounded-md border px-3 py-2"
              />
              <select
                value={traveler.gender}
                onChange={(event) =>
                  setTraveler((prev) => ({ ...prev, gender: event.target.value }))
                }
                className="rounded-md border px-3 py-2"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <input
              required
              min="1"
              type="number"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              className="rounded-md border px-3 py-2"
            />
            <button
              type="submit"
              disabled={isBooking}
              className="rounded-md bg-teal-600 px-4 py-3 font-semibold text-white hover:bg-teal-700 disabled:opacity-60"
            >
              {isBooking
                ? "Booking..."
                : `Book Trip - Rs. ${totalPrice.toLocaleString("en-IN")}`}
            </button>
            {bookingMessage && (
              <p className="text-sm text-teal-700">{bookingMessage}</p>
            )}
          </form>
        </aside>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <DetailSection title="About This Trip">
          <p className="leading-7 text-gray-700">
            {trip.description || "Details coming soon."}
          </p>
        </DetailSection>

        <DetailSection title="Inclusions">
          <TextList items={trip.inclusions} getText={(item) => item.text} />
        </DetailSection>

        <DetailSection title="Exclusions">
          <TextList items={trip.exclusions} getText={(item) => item.text} />
        </DetailSection>

        <DetailSection title="Things To Pack">
          <InfoCards items={trip.thingsToPack} titleKey="title" descKey="desc" />
        </DetailSection>
      </div>

      <div className="mt-8 grid gap-8">
        <DetailSection title="Itinerary">
          {trip.itinerary?.length ? (
            <div className="grid gap-4">
              {trip.itinerary.map((day, index) => (
                <article key={day._id || index} className="rounded-md bg-gray-50 p-5">
                  <p className="text-sm font-semibold text-teal-700">
                    Day {day.day || index + 1}
                  </p>
                  {hasText(day.Title) && (
                    <h3 className="mt-1 text-xl font-bold">{day.Title}</h3>
                  )}
                  {day.todayActivities?.length > 0 && (
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-gray-700">
                      {day.todayActivities.filter(hasText).map((activity) => (
                        <li key={activity}>{activity}</li>
                      ))}
                    </ul>
                  )}
                  {hasText(day.Highlight) && (
                    <p className="mt-3 font-medium text-gray-800">
                      Highlight: {day.Highlight}
                    </p>
                  )}
                  {hasText(day.Note) && (
                    <p className="mt-2 leading-6 text-gray-700">Note: {day.Note}</p>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Details coming soon.</p>
          )}
        </DetailSection>

        <div className="grid gap-8 lg:grid-cols-2">
          <DetailSection title={trip.howToReach?.title || "How To Reach"}>
            <InfoCards
              items={trip.howToReach?.multipleWays}
              titleKey="medium"
              descKey="desc"
            />
          </DetailSection>

          <DetailSection title={trip.bestTimeToVisit?.title || "Best Time To Visit"}>
            <InfoCards
              items={trip.bestTimeToVisit?.multipleWays}
              titleKey="time"
              descKey="desc"
            />
          </DetailSection>

          <DetailSection title={trip.placesToVisit?.title || "Places To Visit"}>
            <InfoCards
              items={trip.placesToVisit?.multipleWays}
              titleKey="place"
              descKey="desc"
            />
          </DetailSection>

          <DetailSection title={trip.thingsToDo?.title || "Things To Do"}>
            <InfoCards
              items={trip.thingsToDo?.multipleWays}
              titleKey="thing"
              descKey="desc"
            />
          </DetailSection>
        </div>

        <DetailSection title="FAQ">
          {trip.faq?.filter((item) => hasText(item.que) || hasText(item.ans)).length ? (
            <div className="grid gap-4">
              {trip.faq
                .filter((item) => hasText(item.que) || hasText(item.ans))
                .map((item, index) => (
                  <article key={item._id || index} className="rounded-md bg-gray-50 p-4">
                    {hasText(item.que) && (
                      <h3 className="font-semibold text-gray-900">{item.que}</h3>
                    )}
                    {hasText(item.ans) && (
                      <p className="mt-2 leading-6 text-gray-700">{item.ans}</p>
                    )}
                  </article>
                ))}
            </div>
          ) : (
            <p className="text-gray-600">Details coming soon.</p>
          )}
        </DetailSection>
      </div>
    </div>
  );
}
