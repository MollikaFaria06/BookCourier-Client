import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; 
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import ReviewCard from "./ReviewCard";
import AOS from "aos";
import "aos/dist/aos.css";

const Reviews = ({ reviewsOrPromise }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState([]); 
  const [canAutoplay, setCanAutoplay] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    const load = async () => {
      try {
        if (!reviewsOrPromise) {
          if (mounted) setReviews([]);
          return;
        }
        if (typeof reviewsOrPromise.then === "function") {
          const data = await reviewsOrPromise;
          if (mounted) setReviews(Array.isArray(data) ? data : []);
        } else {
          if (mounted) setReviews(Array.isArray(reviewsOrPromise) ? reviewsOrPromise : []);
        }
      } catch (err) {
        console.error("Reviews: failed loading", err);
        if (mounted) setReviews([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => (mounted = false);
  }, [reviewsOrPromise]);

  useEffect(() => {
    let mounted = true;
    async function loadModules() {
      try {
        let mod;
        try {
          mod = await import("swiper/modules"); 
        } catch (e) {
          mod = await import("swiper"); 
        }

        const Autoplay = mod.Autoplay || mod.default?.Autoplay;
        const Pagination = mod.Pagination || mod.default?.Pagination;
        const EffectCoverflow = mod.EffectCoverflow || mod.default?.EffectCoverflow;

        const arr = [];
        if (Autoplay) arr.push(Autoplay);
        if (Pagination) arr.push(Pagination);
        if (EffectCoverflow) arr.push(EffectCoverflow);

        if (mounted) {
          setModules(arr);
          setCanAutoplay(Boolean(Autoplay));
        }
      } catch (err) {
        console.warn("Swiper modules unavailable — continuing without them.", err);
      }
    }

    loadModules();
    return () => (mounted = false);
  }, []);

  if (loading) {
    return (
      <div className="py-12 text-center">
        <div className="inline-block animate-pulse px-6 py-3 rounded-lg bg-gray-100 dark:bg-slate-700">
          Loading reviews…
        </div>
      </div>
    );
  }

  if (!reviews || !reviews.length) {
    return (
      <div className="py-12 text-center text-gray-500 dark:text-gray-400">
        No reviews yet.
      </div>
    );
  }

  return (
    <section className="my-24 px-4" data-aos="fade-up">
      <div className="text-center mb-8 max-w-2xl mx-auto" data-aos="fade-up">
        <h3 className="text-3xl sm:text-4xl font-extrabold mb-2
                       bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400
                       text-transparent bg-clip-text">
          📖 What Our Readers Are Saying
        </h3>
        <p className="text-gray-400 dark:text-gray-300">
          Real feedback from our readers — updated regularly
        </p>
      </div>

      <Swiper
        modules={modules}
        loop={true}
        effect={modules.length ? "coverflow" : undefined}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        coverflowEffect={
          modules.length
            ? {
                rotate: 20,
                stretch: 0,
                depth: 200,
                modifier: 1,
              }
            : undefined
        }
        autoplay={
          canAutoplay
            ? { delay: 3000, disableOnInteraction: false }
            : undefined
        }
        pagination={modules.length ? { clickable: true } : false}
        className="py-6"
      >
        {reviews.map((r, i) => (
          <SwiperSlide key={r.id ?? i}>
            <div className="px-3" data-aos="fade-up" data-aos-delay={i * 150}>
              <ReviewCard review={r} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Reviews;
