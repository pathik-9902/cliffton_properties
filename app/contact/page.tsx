export default function ContactPage() {
  return (
    <section className="max-w-xl">
      <h1>Contact Us</h1>
      <p className="mt-4">
        Reach out to our advisory team for buying, selling, or listing property.
      </p>

      <form className="mt-8 space-y-4">
        <input className="w-full border border-border p-3 rounded-lg" placeholder="Name" />
        <input className="w-full border border-border p-3 rounded-lg" placeholder="Email" />
        <textarea className="w-full border border-border p-3 rounded-lg" placeholder="Message" />
        <button className="bg-primary text-secondary px-6 py-3 rounded-lg">
          Submit
        </button>
      </form>
    </section>
  );
}
