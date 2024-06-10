import { useCartStore } from "~/store/cart";

export function CartTotals() {
  const { shoppingCart } = useCartStore();

  for (const gift of shoppingCart) {
    console.log(gift);
  }

  return (
    <div className="py-4 text-sm text-neutral-500">
      <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1">
        <p>Taxes</p>
        <p className="text-right text-base text-black">
          $0.00
          <span className="ml-1 inline">USD</span>
        </p>
      </div>
      <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1">
        <p className="text-right">Calculated at checkout</p>
      </div>
      <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1">
        <p>Total</p>
        <p className="text-right text-base text-black">
          $0.00
          <span className="ml-1 inline">USD</span>
        </p>
      </div>
    </div>
  );
}
