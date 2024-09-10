'use client';
import Link from 'next/link';
export default function AppNav() {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" href={'/countries'}>Countries</Link>
      </div>
    </nav>
  );
};