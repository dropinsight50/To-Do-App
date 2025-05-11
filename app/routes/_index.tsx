import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "AppCore" }];
};

// Redirect to the app dashboard
export async function loader({ request }: LoaderFunctionArgs) {
  // In a real app, you'd check for authentication here
  // and redirect to /login if not authenticated.
  // For now, we'll always redirect to /app (which will render _app._index.tsx)
  return redirect("/app");
}

export default function Index() {
  // This page will likely not be rendered due to the redirect.
  // You can keep it as a fallback or for marketing content if needed.
  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Redirecting to AppCore...
      </h1>
    </div>
  );
}
