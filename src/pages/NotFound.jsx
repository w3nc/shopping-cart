import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section aria-labelledby="notfound-heading">
      <h1 id="notfound-heading">Page not found</h1>
      <p>That page does not exist. The chicken does.</p>
      <Link to="/">Back home</Link>
    </section>
  );
}
