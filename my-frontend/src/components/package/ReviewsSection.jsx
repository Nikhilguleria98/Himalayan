import { motion } from "framer-motion";
import { Star, ThumbsUp, Send, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPackageReviews,
  addPackageReview,
  clearSubmitState,
} from "../../store/client/review-slice";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const AVATAR_COLORS = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-cyan-600",
  "from-rose-500 to-pink-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-amber-600",
  "from-indigo-500 to-blue-600",
];

function getInitials(name = "") {
  return name
    .split(" ")
    .map((w) => w[0]?.toUpperCase() || "")
    .slice(0, 2)
    .join("");
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
}

function StarRating({ rating, interactive = false, onRate }) {
  const [hovered, setHovered] = useState(null);
  const display = hovered ?? rating;

  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          onClick={() => interactive && onRate?.(i + 1)}
          onMouseEnter={() => interactive && setHovered(i + 1)}
          onMouseLeave={() => interactive && setHovered(null)}
          className={`h-4 w-4 transition-colors ${
            interactive ? "cursor-pointer" : ""
          } ${
            i < display
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

// ─── Skeleton Loader ──────────────────────────────────────────────────────────
function ReviewSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl bg-white p-5 shadow-sm border border-gray-100 animate-pulse">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex gap-1">
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="h-4 w-4 rounded-full bg-gray-200" />
          ))}
        </div>
        <div className="h-4 w-4 rounded bg-gray-100" />
      </div>
      <div className="space-y-2 flex-1">
        <div className="h-3 w-full rounded bg-gray-100" />
        <div className="h-3 w-4/5 rounded bg-gray-100" />
        <div className="h-3 w-2/3 rounded bg-gray-100" />
      </div>
      <div className="mt-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-200" />
        <div className="space-y-1.5">
          <div className="h-3 w-24 rounded bg-gray-200" />
          <div className="h-2.5 w-16 rounded bg-gray-100" />
        </div>
      </div>
    </div>
  );
}

// ─── Review Form ──────────────────────────────────────────────────────────────
function ReviewForm({ tripId, onSuccess }) {
  const dispatch = useDispatch();
  const { isSubmitting, submitError, submitSuccess } = useSelector(
    (s) => s.clientReview
  );
  const { isAuthenticated, user } = useSelector((s) => s.auth);

  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (submitSuccess) {
      setMessage("");
      setRating(5);
      onSuccess?.();
      // Clear submit state after 3s
      const t = setTimeout(() => dispatch(clearSubmitState()), 3000);
      return () => clearTimeout(t);
    }
  }, [submitSuccess, dispatch, onSuccess]);

  if (!isAuthenticated) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-5 text-center">
        <p className="text-sm text-gray-500">
          <a href="/Login" className="font-semibold text-teal-600 hover:underline">
            Sign in
          </a>{" "}
          to share your experience
        </p>
      </div>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!message.trim()) return;
    dispatch(
      addPackageReview({
        tourPackageId: tripId,
        userId: user.id,
        userName: user.userName || user.name || "Traveler",
        reviewMessage: message.trim(),
        reviewValue: rating,
      })
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-bold text-gray-800">Share Your Experience</h3>

      {/* Rating Picker */}
      <div className="mb-3 flex items-center gap-3">
        <span className="text-sm text-gray-500">Your rating:</span>
        <StarRating rating={rating} interactive onRate={setRating} />
      </div>

      {/* Textarea */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Tell other travelers about your experience..."
        rows={3}
        className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-300"
        required
      />

      {/* Error */}
      {submitError && (
        <p className="mt-2 text-xs text-red-500">{submitError}</p>
      )}
      {/* Success */}
      {submitSuccess && (
        <p className="mt-2 text-xs text-emerald-600 font-medium">
          ✓ Review submitted successfully!
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting || !message.trim()}
        className="mt-3 flex items-center gap-2 rounded-full bg-teal-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        {isSubmitting ? "Submitting…" : "Submit Review"}
      </button>
    </form>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ReviewsSection({ tripId }) {
  const dispatch = useDispatch();
  const { isLoading, reviews, error } = useSelector((s) => s.clientReview);

  useEffect(() => {
    if (tripId) {
      dispatch(fetchPackageReviews(tripId));
    }
  }, [dispatch, tripId]);

  // Computed stats
  const totalReviews = reviews.length;
  const avgRating =
    totalReviews > 0
      ? (reviews.reduce((s, r) => s + (r.reviewValue || 0), 0) / totalReviews).toFixed(1)
      : null;

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.reviewValue) === star).length,
    pct:
      totalReviews > 0
        ? Math.round(
            (reviews.filter((r) => Math.round(r.reviewValue) === star).length /
              totalReviews) *
              100
          )
        : 0,
  }));

  return (
    <section className="bg-[#F8FAFC] py-16">
      <div className="responsivewidth">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <span className="inline-block rounded-full bg-teal-100 px-4 py-1 text-sm font-semibold text-teal-700">
              Testimonials
            </span>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
              What Travelers Say
            </h2>
          </div>

          {/* Overall Rating summary */}
          {(avgRating || isLoading) && (
            <div className="flex items-center gap-4 rounded-2xl bg-white px-6 py-4 shadow-sm shadow-gray-200/60">
              <div>
                <p className="text-5xl font-bold text-teal-600">
                  {isLoading ? "—" : avgRating}
                </p>
                <StarRating rating={isLoading ? 0 : Math.round(Number(avgRating))} />
                <p className="mt-1 text-sm text-gray-500">
                  {isLoading ? "Loading…" : `${totalReviews} review${totalReviews !== 1 ? "s" : ""}`}
                </p>
              </div>
              {!isLoading && totalReviews > 0 && (
                <div className="ml-4 space-y-1.5">
                  {ratingCounts.map(({ star, pct }) => (
                    <div key={star} className="flex items-center gap-2">
                      <span className="w-3 text-xs text-gray-500">{star}</span>
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-yellow-400 transition-all duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* ── Loading Skeletons ── */}
        {isLoading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {Array(4).fill(0).map((_, i) => <ReviewSkeleton key={i} />)}
          </div>
        )}

        {/* ── Error ── */}
        {!isLoading && error && (
          <div className="mb-6 rounded-xl bg-red-50 px-5 py-4 text-sm text-red-600">
            Unable to load reviews. {error}
          </div>
        )}

        {/* ── No Reviews ── */}
        {!isLoading && !error && totalReviews === 0 && (
          <div className="mb-8 flex flex-col items-center gap-3 py-8 text-center text-gray-500">
            <ThumbsUp className="h-10 w-10 text-gray-300" />
            <p className="text-sm">No reviews yet. Be the first to share your experience!</p>
          </div>
        )}

        {/* ── Review Cards ── */}
        {!isLoading && totalReviews > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {reviews.map((review, i) => (
              <motion.div
                key={review._id || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="flex flex-col rounded-2xl bg-white p-5 shadow-sm shadow-gray-200/60 transition hover:shadow-md"
              >
                {/* Rating */}
                <div className="mb-3 flex items-center justify-between">
                  <StarRating rating={Math.round(review.reviewValue || 0)} />
                  <ThumbsUp className="h-4 w-4 text-teal-400" />
                </div>

                {/* Review Text */}
                <p className="flex-1 text-sm leading-6 text-gray-600 line-clamp-4">
                  "{review.reviewMessage}"
                </p>

                {/* Author */}
                <div className="mt-4 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${
                      AVATAR_COLORS[i % AVATAR_COLORS.length]
                    } text-sm font-bold text-white`}
                  >
                    {getInitials(review.userName)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {review.userName || "Anonymous"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── Review Form ── */}
        {tripId && (
          <ReviewForm
            tripId={tripId}
            onSuccess={() => dispatch(fetchPackageReviews(tripId))}
          />
        )}
      </div>
    </section>
  );
}
