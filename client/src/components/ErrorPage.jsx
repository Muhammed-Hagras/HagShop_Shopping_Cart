import { useRouteError } from "react-router-dom";

export default function ErrorPage() {

  return (
    <div id="error-page" className="not-found vh-100">
      <h1>Oops!</h1>
      <h1>404 Not Found</h1>

      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
}