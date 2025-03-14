import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>
        Please visit <Link href="/login">Login</Link> to sign in.
      </p>
    </div>
  );
}