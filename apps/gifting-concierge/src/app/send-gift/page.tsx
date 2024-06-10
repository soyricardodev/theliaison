"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  Badge,
  Button,
  Image,
  Link,
  Progress,
  RadioGroup,
} from "@nextui-org/react";
import { AnimatePresence, LazyMotion, m, domAnimation } from "framer-motion";
import {
  PlusIcon,
  StarIcon,
  ArrowLeftIcon,
  ShoppingCartIcon,
} from "lucide-react";
// import {VisaIcon, MasterCardIcon, PayPalIcon} from "./providers";
// import {AcmeIcon} from "./social";
// import ShippingForm from "./shipping-form";
import { OrderSummary } from "./_components/order-summary";
import { RecipientContactForm } from "./_components/recipient-contact-form";
import { useCartStore } from "~/store/cart";
// import cartItems from "./cart-items";
// import PaymentForm from "./payment-form";
// import PaymentMethodRadio from "./payment-method-radio";

export default function Component() {
  const [[page, direction], setPage] = React.useState([0, 0]);
  const { shoppingCart } = useCartStore();

  const totalPrice = React.useMemo(() => {
    return shoppingCart.reduce(
      (acc, item) => acc + (item.unitPrice / 100) * item.quantity,
      0,
    );
  }, [shoppingCart]);
  const totalPriceFormatted = React.useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(totalPrice);
  }, [totalPrice]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 20 : -20,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    if (page + newDirection < 0 || page + newDirection > 2) return;

    setPage([page + newDirection, newDirection]);
  };

  const ctaLabel = React.useMemo(() => {
    switch (page) {
      case 0:
        return "Continue to send gift";
      case 1:
        return "Finish order";
      case 2:
        return "Place order";
      default:
        return "Continue to shipping";
    }
  }, [page]);

  const stepTitle = React.useMemo(() => {
    switch (page) {
      case 0:
        return "Review your order";
      case 1:
        return "Who do you want to send the gift to?";
      case 2:
        return "How would you like to pay?";
      default:
        return "Review your order";
    }
  }, [page]);

  const stepsContent = React.useMemo(() => {
    const paymentRadioClasses = {
      wrapper: "group-data-[selected=true]:border-foreground",
      base: "data-[selected=true]:border-foreground",
      control: "bg-foreground",
    };

    switch (page) {
      case 0:
        return <OrderSummary hideTitle />;
      case 1:
        return (
          <div className="mt-4 flex flex-col gap-6">
            <RecipientContactForm hideTitle variant="bordered" />
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Accordion
                keepContentMounted
                aria-label="Select or add payment method"
                defaultExpandedKeys={["select_existing_payment"]}
                itemClasses={{
                  title: "text-medium text-foreground-500",
                  indicator: "text-foreground",
                }}
                selectionMode="multiple"
                showDivider={false}
              >
                <AccordionItem
                  key="select_existing_payment"
                  title="Select existing payment method"
                >
                  <RadioGroup
                    aria-label="Select existing payment method"
                    classNames={{ wrapper: "gap-3" }}
                    defaultValue="4229"
                  >
                    {/* <PaymentMethodRadio
                      isRecommended
                      classNames={paymentRadioClasses}
                      description="Expires on 12/2024"
                      icon={<VisaIcon height={30} width={30} />}
                      label="Visa ending in 4229"
                      value="4229"
                    />
                    <PaymentMethodRadio
                      classNames={paymentRadioClasses}
                      description="Expires on 02/2025"
                      icon={<MasterCardIcon height={30} width={30} />}
                      label="MasterCard ending in 8888"
                      value="8888"
                    />
                    <PaymentMethodRadio
                      classNames={paymentRadioClasses}
                      description="Select this option to pay with PayPal"
                      icon={<PayPalIcon height={30} width={30} />}
                      label="PayPal"
                      value="paypal"
                    /> */}
                  </RadioGroup>
                </AccordionItem>
                <AccordionItem
                  key="add_new_payment"
                  title="Add a new payment method"
                >
                  {/* <PaymentForm variant="bordered" /> */}
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        );
      default:
        return null;
    }
  }, [page]);

  return (
    <section className="flex h-[calc(100vh_-_60px)] w-full gap-8">
      {/* Left */}
      <div className="w-full flex-none py-4 lg:w-[44%]">
        <div className="flex justify-between px-2">
          <div className="flex items-center">
            {/* <AcmeIcon size={40} /> */}
            <p className="font-semibold">ACME</p>
          </div>
          <div className="flex items-center gap-2">
            <p>
              <span className="text-small font-semibold text-default-700">
                {totalPriceFormatted}
              </span>
              <span className="ml-1 text-small text-default-500">
                ({shoppingCart.length} items)
              </span>
            </p>
            <Badge content={shoppingCart.length} showOutline={false}>
              <ShoppingCartIcon width={28} />
            </Badge>
          </div>
        </div>
        <div className="flex h-full flex-1 flex-col p-4">
          <div>
            <Button
              className="-ml-2 text-default-700"
              isDisabled={page === 0}
              radius="full"
              variant="flat"
              onPress={() => paginate(-1)}
            >
              <ArrowLeftIcon width={20} />
              Go back
            </Button>
          </div>

          <AnimatePresence custom={direction} initial={false} mode="wait">
            <LazyMotion features={domAnimation}>
              <m.form
                key={page}
                animate="center"
                className="mt-8 flex flex-col gap-3"
                custom={direction}
                exit="exit"
                initial="enter"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                variants={variants}
                onSubmit={(e) => e.preventDefault()}
              >
                <h1 className="text-2xl font-medium">{stepTitle}</h1>
                {stepsContent}
                <Button
                  fullWidth
                  className="mt-8 bg-foreground text-background"
                  size="lg"
                  onPress={() => paginate(1)}
                >
                  {ctaLabel}
                </Button>
              </m.form>
            </LazyMotion>
          </AnimatePresence>

          <div className="mt-auto flex w-full justify-between gap-8 pb-8 pt-4">
            <div className="flex w-full flex-col items-start gap-2">
              <p className="text-small font-medium">Review</p>
              <Progress
                classNames={{
                  indicator: "!bg-foreground",
                }}
                value={page >= 0 ? 100 : 0}
              />
            </div>
            <div className="flex w-full flex-col items-start gap-2">
              <p className="text-small font-medium">Recipient Information</p>
              <Progress
                classNames={{
                  indicator: "!bg-foreground",
                }}
                value={page >= 1 ? 100 : 0}
              />
            </div>
            <div className="flex w-full flex-col items-start gap-2">
              <p className="text-small font-medium">Confirm and Finish</p>
              <Progress
                classNames={{
                  indicator: "!bg-foreground",
                }}
                value={page >= 2 ? 100 : 0}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="relative hidden w-full overflow-hidden rounded-medium shadow-small lg:block">
        {/* Top Shadow */}
        <div className="absolute top-0 z-10 h-32 w-full rounded-medium bg-gradient-to-b from-black/80 to-transparent" />
        {/* Bottom Shadow */}
        <div className="absolute bottom-0 z-10 h-32 w-full rounded-medium bg-gradient-to-b from-transparent to-black/80" />

        {/* Content */}
        <div className="absolute top-10 z-10 flex w-full items-start justify-between px-10">
          <h2 className="text-2xl font-medium text-white/70 [text-shadow:_0_2px_10px_rgb(0_0_0_/_20%)]">
            The future of footwear is here.
          </h2>
          <div className="flex flex-col items-end gap-1">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="text-white/80" width={16} />
              ))}
            </div>
            <Link
              className="text-white/60"
              href="#"
              size="sm"
              underline="always"
            >
              120 reviews
            </Link>
          </div>
        </div>
        <Image
          removeWrapper
          alt="Nike Adapt BB 2.0"
          className="absolute inset-0 z-0 h-full w-full rounded-none object-cover"
          height="100%"
          src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes.jpg"
        />
        <div className="absolute inset-x-4 bottom-4 z-10 flex items-center justify-between rounded-medium bg-background/10 p-8 backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50 ">
          <div className="flex flex-col gap-1">
            <h2 className="left-10 z-10 text-2xl font-medium text-white/90">
              Nike Adapt BB 2.0
            </h2>
            <p className="left-10 z-10 text-white/80">$399.99</p>
          </div>
          <Button
            className="border-white/40 pl-3 text-white"
            startContent={<PlusIcon width={24} />}
            variant="bordered"
          >
            Add to cart
          </Button>
        </div>
      </div>
    </section>
  );
}
