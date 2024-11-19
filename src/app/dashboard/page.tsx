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

  return <div>DashboardPage</div>;
}

export default DashboardPage;
