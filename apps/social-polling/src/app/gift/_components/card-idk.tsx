import { Card, CardBody, CardFooter, Spacer } from "@nextui-org/react";

interface CardIDKProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function CardIDK({ title, description, children }: CardIDKProps) {
  return (
    <Card className="w-[420px]">
      <CardBody className="px-3 pb-1">
        {children}
        <Spacer y={2} />
        <div className="flex flex-col gap-2 px-2">
          <p className="text-large font-medium">{title}</p>
          <p className="text-small text-default-400">{description}</p>
        </div>
      </CardBody>
      <CardFooter />
    </Card>
  );
}
