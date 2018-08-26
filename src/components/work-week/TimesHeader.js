import { CardHeader } from "reactstrap";
import React from "react";

export function TimeHeader({ date }) {
  return (
    <CardHeader className="p-1">
      <blockquote className="blockquote text-center mb-0">
        <kbd>Date</kbd>
        <p className="mb-0 text-muted">{date}</p>
      </blockquote>
    </CardHeader>
  );
}
