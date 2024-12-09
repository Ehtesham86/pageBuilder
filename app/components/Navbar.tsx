// app/components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/pages/services-page">Services</Link>
        </li>
        <li>
          <Link href="/pages/about">About</Link>
        </li>
        <li>
          <Link href="/pages/create">Create</Link>
        </li>
      </ul>
    </nav>
  );
}
