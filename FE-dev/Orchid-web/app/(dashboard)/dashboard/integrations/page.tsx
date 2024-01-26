import React from 'react'
import integrations from "@/data/intigration";
import Integration from '@/components/dashboard/integration/integration';
const Integrations = () => {
    return (
        <>
          {integrations?.map((integration) => (
            <Integration key={integration.id} integration={integration} />
          ))}
        </>
      );
}

export default Integrations