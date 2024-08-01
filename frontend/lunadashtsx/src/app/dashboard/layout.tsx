import React from "react";
import Header from "@/app/components/header";
import SideNav from "@/app/components/sidenav";
import PageWrapper from "@/app/components/pagewrapper";
import MarginWidthWrapper from "@/app/components/marginwidthwrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={"bg-white"}>
      <div className="flex">
        <SideNav />
        <div className="flex-1">
          <MarginWidthWrapper>
            <Header />
            <PageWrapper>{children}</PageWrapper>
          </MarginWidthWrapper>
        </div>
      </div>
    </main>
  );
}
