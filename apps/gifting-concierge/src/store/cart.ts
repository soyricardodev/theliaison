import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  quantity: number;
  unitPrice: number;
}

interface CartStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;

  shoppingCart: CartItem[];
  addToCart: (item: CartItem) => void;
  decrementItemQuantity: (item: CartItem) => void;
  removeItemFromCart: (item: CartItem) => void;
}

export const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      isOpen: false,
      setIsOpen: (isOpen: boolean) => set({ isOpen }),
      shoppingCart: [],
      addToCart: (item: CartItem) => {
        const { shoppingCart } = get();
        const updatedCart = updateCart(item.id, shoppingCart, item.unitPrice);
        set({ shoppingCart: updatedCart });
      },
      incrementItemQuantity: (item: CartItem) =>
        set((state) => ({
          shoppingCart: state.shoppingCart.map((gift) =>
            gift.id === item.id
              ? { ...gift, quantity: gift.quantity + 1 }
              : gift,
          ),
        })),
      decrementItemQuantity: (item: CartItem) => {
        const { shoppingCart } = get();
        const updatedCart = removeCart(item.id, shoppingCart);
        set({ shoppingCart: updatedCart });
      },
      removeItemFromCart: (item: CartItem) =>
        set((state) => ({
          shoppingCart: state.shoppingCart.filter(
            (gift) => gift.id !== item.id,
          ),
        })),
    }),
    {
      name: "cart",
    },
  ),
);

function updateCart(
  giftId: string,
  shoppingCart: CartItem[],
  unitPrice: number,
): CartItem[] {
  const cartItem: CartItem = { id: giftId, quantity: 1, unitPrice };

  const productOnCart = shoppingCart.map((item) => item.id).includes(giftId);

  if (!productOnCart) shoppingCart.push(cartItem);
  else {
    return shoppingCart.map((item) => {
      if (item.id === giftId) return { ...item, quantity: item.quantity + 1 };
      return item;
    });
  }

  return shoppingCart;
}

function removeCart(giftId: string, shoppingCart: CartItem[]): CartItem[] {
  return shoppingCart
    .map((item) => {
      if (item.id === giftId) return { ...item, quantity: item.quantity - 1 };
      return item;
    })
    .filter((item) => {
      return item.quantity;
    });
}
