import { getAuth } from "@/features/auth/queries/get-auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const { user } = await getAuth();
  if (!user) redirect("/sign-in");
  return <div>Dashboard</div>;
};

export default page;
