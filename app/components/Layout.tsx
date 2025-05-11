import React from 'react';
import { NavLink, Outlet } from '@remix-run/react';
import { FolderKanban, ListTodo, NotebookPen, LayoutDashboard } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'To-Do', href: '/todos', icon: ListTodo },
  { name: 'Notes', href: '/notes', icon: NotebookPen },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 bg-gray-50 dark:bg-gray-900 p-4 border-r border-gray-200 dark:border-gray-800 flex flex-col">
        <div className="mb-8">
          <NavLink to="/" className="flex items-center space-x-2 p-2">
            {/* Replace with your app logo or name */}
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-500"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
            <span className="text-xl font-semibold text-gray-800 dark:text-gray-200 hidden md:inline">AppCore</span>
          </NavLink>
        </div>
        <nav className="flex-grow">
          <ul>
            {navItems.map((item) => (
              <li key={item.name} className="mb-2">
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
                      isActive
                        ? 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 font-semibold'
                        : 'text-gray-600 dark:text-gray-400'
                    }`
                  }
                >
                  <item.icon size={20} />
                  <span className="hidden md:inline">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        {/* User/Auth section can go here */}
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
