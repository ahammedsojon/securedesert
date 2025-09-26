import { redirect } from "next/navigation";
import { getAnalytics } from "@/actions/get-analytics";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { DataCard } from "./components/data-card";
import { Chart } from "./components/chart";

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions);

  // only admin can access
  if (session?.user.role !== "ADMIN") {
    return redirect("/");
  }

  const { data, totalRevenue, totalSales } = await getAnalytics(session.user.id);

  return (
    <div className="p-6">
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <DataCard label="Total Revenue" value={totalRevenue} shouldFormat />
        <DataCard label="Total Sales" value={totalSales} />
      </div>
      <Chart data={data} />
    </div>
  );
}
