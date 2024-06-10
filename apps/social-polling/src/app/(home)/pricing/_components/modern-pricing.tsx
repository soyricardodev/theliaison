"use client";

import React from "react";
import { Icon } from "@iconify/react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Link,
  Spacer,
  Tab,
  Tabs,
} from "@nextui-org/react";

import type { Tables } from "@theliaison/supabase/database-types";
import { cn } from "@theliaison/ui";

type Prices = Tables<"prices">;

interface Product {
  active: boolean | null;
  description: string | null;
  id: string;
  image: string | null;
  metadata: Record<string, string>;
  name: string | null;
  prices: Prices[];
}

export function ModernPricing({ products }: { products: Product[] }) {
  return products.map((product) => (
    <Card
      key={product.id}
      isBlurred
      className={cn("bg-default-100/50 p-3", {
        "!border-small border-secondary/50": product.id === "1",
      })}
      shadow="md"
    >
      <CardHeader className="flex flex-col items-start gap-2 pb-6">
        <h2 className="text-large font-medium">{product.name}</h2>
        <p className="text-medium text-default-500">{product.description}</p>
      </CardHeader>
      <Divider />
      <CardBody className="gap-8">
        <p className="flex items-baseline gap-1 pt-2">
          <span className="to-foreground-600 inline bg-gradient-to-br from-foreground bg-clip-text text-4xl font-semibold leading-7 tracking-tight text-transparent">
            {Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "usd",
              minimumFractionDigits: 0,
            }).format((product.prices[0]?.unit_amount || 0) / 100)}
          </span>
          <span className="text-small text-default-400 font-medium">
            /per month
          </span>
        </p>
        <ul className="flex flex-col gap-2">
          {(Object.keys(product.metadata) as string[]).map(
            (key) =>
              key.startsWith("feature_") && (
                <li key={key} className="flex items-center gap-2">
                  <Icon className="text-secondary" icon="ci:check" width={24} />
                  <p className="text-default-500">{product.metadata[key]}</p>
                </li>
              ),
          )}
        </ul>
      </CardBody>
      <CardFooter>
        <Button fullWidth as={Link} color="secondary" href="/" variant={"flat"}>
          Get Started
        </Button>
      </CardFooter>
    </Card>
  ));
}
