import Link from "next/link";

export default function NavBar() {
  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl">
          NoteJar
        </Link>
      </div>
    </div>
  );
}
