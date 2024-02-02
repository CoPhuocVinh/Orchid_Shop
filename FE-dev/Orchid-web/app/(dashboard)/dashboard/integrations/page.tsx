import React from "react";
import integrations from "@/data/intigration";
import Integration from "@/components/dashboard/integration/integration";
const Integrations = () => {
  return (
    <main className="w-full xl:px-[48px] px-6 pb-6 xl:pb-[48px] sm:pt-[156px] pt-[100px]">
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 lg:gap-4 xl:gap-6">
        {integrations?.map((integration) => (
          <Integration key={integration.id} integration={integration} />
        ))}
      </div>
    </main>
  );
};

export default Integrations;
