'use client'
import Image from "next/image";
import CompanyListings from "./companies/CompanyListings";
import { useSession } from "next-auth/react";
import Headings from "@/components/company/Headings";
import LoginButton from "@/components/nav/LoginButton";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div>
        <CompanyListings />
    </div>
  );
}
