import { Card } from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/fonts";
import Cards from "@/app/ui/dashboard/cards";
import { Suspense } from "react";
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from "@/app/ui/skeletons";
export default async function Page({
  searchParams,
}: {
  searchParams: { query: string; page: string };
}) {
  console.log("dashboiard = ", searchParams);

  //----------------------<< handled fetching data without water-fall >>----------------------

  // const [
  //   latestInvoices,
  //   // {
  //   //   numberOfCustomers,
  //   //   numberOfInvoices,
  //   //   totalPaidInvoices,
  //   //   totalPendingInvoices,
  //   // },
  //   cardData,
  // ] = await Promise.all([fetchLatestInvoices(), fetchCardData()]);
  // console.log(cardData);
  // const {
  //   numberOfCustomers,
  //   numberOfInvoices,
  //   totalPaidInvoices,
  //   totalPendingInvoices,
  // } = cardData;

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          {/* @ts-expect-error server component */}

          <Cards />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          {/* @ts-expect-error server component */}

          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          {/* @ts-expect-error server component */}

          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
