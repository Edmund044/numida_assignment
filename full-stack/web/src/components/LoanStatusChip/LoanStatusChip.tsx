import React, { useMemo } from "react";
import { Chip } from "@mui/material";

interface LoanStatusProps {
  status: "On time" | "Late" | "Defaulted" | "Unpaid";
}

const LoanStatusChip: React.FC<LoanStatusProps> = ({ status }) => {
  const color = useMemo(() => {
    const statusColors: Record<LoanStatusProps["status"], "success" | "warning" | "error" | "default"> = {
      "On Time": "success",
      "Late": "warning",
      "Defaulted": "error",
      "Unpaid": "default",
    };
    return statusColors[status];
  }, [status]);

  return <Chip label={status} color={color} />;
};

export default LoanStatusChip;
