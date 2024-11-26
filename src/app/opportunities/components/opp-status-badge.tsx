import React from "react";

import { Badge } from "@/components/ui/badge";

const OppStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "pending":
      return <Badge variant="warning">În așteptare</Badge>;
    case "approved":
      return <Badge variant="success">Aprobat</Badge>;
    case "rejected":
      return <Badge variant="destructive">Respins</Badge>;
    default:
      return null;
  }
};

export default OppStatusBadge;
