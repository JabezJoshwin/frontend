import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Notice: NO <html> or <body> tags here!
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* You can add your Dashboard-specific Navbar/Sidebar here later */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}