"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

function updateTabCounter(changeValue: -1 | 1) {
  console.log("updateTabCounter 호출", changeValue);

  const currentCount = parseInt(localStorage.getItem("tabCount") || "0");
  const updatedCount = currentCount + changeValue;
  //   console.log("currentCount", currentCount);

  localStorage.setItem("tabCount", updatedCount.toString());
  console.log("updatedCount", updatedCount);
  return updatedCount;
}

const SignOutHandler = () => {
  useEffect(() => {
    window.onbeforeprint = function (e) {
      console.log("useEffect 실행");
      const tabCount = updateTabCounter(1);
      console.log("tabCount in useEffect", tabCount);
      if (tabCount <= 0) {
        localStorage.removeItem("tabCount");
        signOut();
        console.log("로그아웃됨");
      }
    };

    const handleBeforeUnload = () => updateTabCounter(-1);

    window.addEventListener("unload", handleBeforeUnload);
    return () => window.removeEventListener("unload", handleBeforeUnload);
  }, []);
  return null;
};

export default SignOutHandler;
