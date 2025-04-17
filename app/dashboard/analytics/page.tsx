import AnalyticCard from "@/components/analytics/analytic-card";
import AnalyticChart from "@/components/analytics/analytic-chart";
import { analytics, weeklyAnalytics } from "@/server/actions/analytics";
import { Box, Clock, Package, Users } from "lucide-react";
import React from "react";

const Analytics = async () => {
  const analyticDatas = await analytics();
  const weeklyAnalyticsData = await weeklyAnalytics();
  // console.log("weeklyAnalyticsData", weeklyAnalyticsData);

  
  return (
    <main className="flex flex-col gap-4" >
      {analyticDatas && (
        <div  className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <AnalyticCard
            count={analyticDatas.pendingOrders}
            title="Pending Orders"
            icon={<Clock size={26} />}
            href="/dashboard/orders"
          />
          <AnalyticCard
            count={analyticDatas.completeOrders}
            title="Completed Orders"
            icon={<Package size={26} />}
            href="/dashboard/orders"
          />
          <AnalyticCard
            count={analyticDatas.productCount}
            title="Total Products"
            icon={<Box size={26} />}
            href="/dashboard/products"
          />
          <AnalyticCard
            count={analyticDatas.totalUsers}
            title="Total Users"
            icon={<Users size={26} />}
            href="/"
          />
        </div>
      )}
      <AnalyticChart data={weeklyAnalyticsData!}  />
    </main>
  );
};

export default Analytics;
