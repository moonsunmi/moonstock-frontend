import { Metadata } from "next";
import Home from "./home";

export const metadata: Metadata = {
  title: "MoonStcok",
  description: "Good tools for investor",
};

export default async function Page() {
  return <Home />;
}
