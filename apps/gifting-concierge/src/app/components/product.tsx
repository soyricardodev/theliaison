import { cn } from "@theliaison/ui";

export interface ProductItem {
  id: string;
  name: string;
  href: string;
  price: number;
  description?: string;
  imageSrc: string;
}

export type ProductListItemProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "id"
> & {
  removeWrapper?: boolean;
} & ProductItem;

export const Product = ({
  name,
  price,
  description,
  imageSrc,
  removeWrapper,
  className,
  ...props
}: ProductListItemProps) => {
  return (
    <div
      className={cn(
        "rounded-large bg-content1 shadow-medium relative flex w-64 max-w-full flex-none scroll-ml-6 flex-col gap-3 p-4",
        {
          "rounded-none bg-transparent shadow-none": removeWrapper,
        },
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "rounded-medium bg-content2 relative flex h-52 max-h-full w-full flex-col items-center justify-center overflow-visible",
        )}
      >
        <div className={cn("flex flex-col gap-2 px-4 pt-6")}>
          <h3 className="text-default-800 text-xl font-semibold tracking-tight">
            {name}
          </h3>
          <p className="text-small text-default-500">{description}</p>
        </div>
        <img
          // removeWrapper
          alt={name}
          className={cn(
            "z-0 h-full max-h-full w-full max-w-[80%] overflow-visible object-contain object-center hover:scale-110",
          )}
          src={imageSrc}
        />
      </div>
      <div className="flex flex-col gap-3 px-1">
        <div className={cn("flex items-center justify-between")}>
          <h3 className="text-medium text-default-700 font-medium">{name}</h3>
          <p className="text-medium text-default-500 font-medium">${price}</p>
        </div>
        {description ? (
          <p className="text-small text-default-500">{description}</p>
        ) : null}
        <div className="flex gap-2">
          <button
            // fullWidth
            className="font-medium"
            // color="primary"
            // radius="lg"
            // variant={isPopular ? "flat" : "solid"}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
