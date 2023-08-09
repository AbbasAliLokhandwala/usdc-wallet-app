import React from "react";
import { Tooltip } from "reactstrap";

interface TooltipProps {
  targetId: string;
  content: string;
}

export const AddressTooltip: React.FC<TooltipProps> = ({
  targetId,
  content,
}) => {
  return (
    <Tooltip placement="top" target={targetId}>
      {content}
    </Tooltip>
  );
};
