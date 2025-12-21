import React from "react";
import toast, { Toaster } from "react-hot-toast";

const Newsletter = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    toast.success(`Subscribed successfully with ${email}`);
    e.target.reset();
  };

  return (
    <section className="py-12 bg-gradient-to-r from-purple-900 to-pink-700 rounded-xl mt-8 text-white shadow-lg relative">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 text-center md:text-left">
          {/* Meaningful & Stylish Heading */}
          <h3 className="text-3xl sm:text-4xl font-extrabold
                         bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400
                         text-transparent bg-clip-text">
            📬 Stay Updated with Our Newsletter
          </h3>
          <p className="text-sm mt-2 text-white/80">
            Subscribe to receive new arrivals, special promos, and delivery updates directly to your inbox.
          </p>
        </div>

        <form
          className="flex gap-2 w-full md:w-auto mt-4 md:mt-0"
          onSubmit={handleSubscribe}
        >
          <input
            name="email"
            required
            type="email"
            placeholder="Your email"
            className="input input-bordered w-full md:w-64"
          />
          <button className="btn btn-primary">Subscribe</button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
