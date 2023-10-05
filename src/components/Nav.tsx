import Link from "next/link";

export const Nav = () => {
  return (
    <nav className="py-4">
      <Link href="/" className="mr-8">
        Home
      </Link>
      <Link href="/about" className="mr-8">
        About
      </Link>
      <Link
        href={{
          pathname: "/characters",
          query: { page: 1 },
        }}
        className="mr-8"
      >
        Characters
      </Link>
    </nav>
  );
};
