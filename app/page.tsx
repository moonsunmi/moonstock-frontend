import { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export default async function Page() {
  return permanentRedirect("/averageInPrice");
}

export const metadata: Metadata = {
  title: "MoonStcok",
  description: "Good tools for investor",
};
