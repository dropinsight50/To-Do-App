import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Dashboard | AppCore" }];
};

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder cards for dashboard content */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">Projects Overview</h2>
          <p className="text-gray-600 dark:text-gray-400">Summary of your projects.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">Upcoming Todos</h2>
          <p className="text-gray-600 dark:text-gray-400">Your next important tasks.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">Recent Notes</h2>
          <p className="text-gray-600 dark:text-gray-400">Quick access to your latest notes.</p>
        </div>
      </div>
    </div>
  );
}
