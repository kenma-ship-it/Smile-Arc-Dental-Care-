import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap flex min-h-[70vh] flex-col items-start justify-center gap-6 py-32">
      <h1 className="h-display">Page not found</h1>
      <p className="lede">That page does not exist. The clinic&rsquo;s details and booking form are on the home page.</p>
      <Link href="/" className="btn btn-primary btn-lg">
        Back to home
      </Link>
    </div>
  );
}
