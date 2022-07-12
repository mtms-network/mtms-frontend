import { MainLayout } from "components";
import React from "react";

export default function ComingSoon() {
  return (
    <MainLayout className="">
      <div className="flex justify-center items-center pt-12">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex basis-full w-full sm:basis-1/2">
            <img src="/images/meeting-and-earn.png" alt="intro" style={{ width: 360 }} />
          </div>
          <div className="flex basis-full w-full sm:basis-1/2 flex-col pt-20">
            <div>
              <p className="text-3xl font-bold">The Future of Meetings,</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">Meet and Earn</p>
            </div>
            <div className="pt-4">
              <p className="text-sm text-slate-500">Coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
