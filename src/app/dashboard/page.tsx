"use client";

import { useEffect } from "react";

import { useAuth } from "@clerk/nextjs";

function DashboardPage() {
  const { getToken } = useAuth();

  useEffect(() => {
    getToken({ template: "Test" }).then((token) => {
      console.log("Clerk Token", token);
    });
  }, []);

  return (
    <div>
      <h1 className="text-9xl">DashboardPage</h1>
    </div>
  );
}

export default DashboardPage;
