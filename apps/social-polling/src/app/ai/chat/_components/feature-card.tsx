"use client";

import type { CardProps } from "@nextui-org/react";
import type React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export type FeatureCardProps = CardProps & {
  title: string;
  descriptions: string[];
  icon: React.ReactNode;
};

export const FeatureCard = ({
  ref,
  title,
  descriptions = [],
  icon,
  ...props
}: FeatureCardProps & {
  ref?: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <Card ref={ref} className="bg-content2" shadow="none" {...props}>
      <CardHeader className="flex flex-col gap-2 px-4 pb-4 pt-6">
        {icon}
        <p className="text-medium text-content2-foreground">{title}</p>
      </CardHeader>
      <CardBody className="flex flex-col gap-2">
        {descriptions.map((description, index) => (
          <div
            key={description}
            className="rounded-medium bg-content3 text-content3-foreground flex min-h-[50px] px-3 py-2"
          >
            <p className="text-small">{description}</p>
          </div>
        ))}
      </CardBody>
    </Card>
  );
};

FeatureCard.displayName = "FeatureCard";
