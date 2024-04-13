import { Metadata } from "next";
import Home from "./home";

export default async function Page() {
  return <Home />;
}

export const metadata: Metadata = {
  title: "MoonStcok",
  description: "Good tools for investor",
};
