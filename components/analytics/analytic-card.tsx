import React from "react";
import { Card, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

type AnalyticCardProps = {
  count: number;
  title: string;
  icon: React.ReactNode;
  href: string;
};
const AnalyticCard = ({ count, title, icon,href }: AnalyticCardProps) => {
  const isPendingCard = title === "PENDING";
  return (
    <Link href={href}>
      <Card className={cn(isPendingCard && "bg-black text-white")}>
        <CardHeader>
          <div className="flex items-center justify-between">
            {icon}
            <h2 className="text-2xl font-bold">{count} </h2>
            {/* <h2 className="text-2xl">{count} +</h2> */}
          </div>
          <p className="text-normal font-medium  ">{title}</p>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default AnalyticCard;
