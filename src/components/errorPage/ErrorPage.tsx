import { useRouteError, Link } from 'react-router-dom';
import './ErrorPage.scss';

type Error = {
  statusText?: string;
  message?: string;
};

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{(error as Error).statusText || (error as Error).message}</i>
      </p>
      <Link to="/search">Back to main page</Link>
    </div>
  );
}
