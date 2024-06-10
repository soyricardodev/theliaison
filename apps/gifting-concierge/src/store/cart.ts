import { create } from "zustand";

// interface Cart {
//   items: CartItem[]
// }

export interface CartItem {
  id: string;
  quantity: number;
}

interface CartStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;

  shoppingCart: CartItem[];
  // addItemToCart: (item: CartItem) => void;
  addToCart: (item: CartItem) => void;
  decrementItemQuantity: (item: CartItem) => void;
  removeItemFromCart: (item: CartItem) => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  shoppingCart: [],
  addToCart: (item: CartItem) => {
    const { shoppingCart } = get();
    const updatedCart = updateCart(item.id, shoppingCart);
    set({ shoppingCart: updatedCart });
  },
  incrementItemQuantity: (item: CartItem) =>
    set((state) => ({
      shoppingCart: state.shoppingCart.map((gift) =>
        gift.id === item.id ? { ...gift, quantity: gift.quantity + 1 } : gift,
      ),
    })),
  decrementItemQuantity: (item: CartItem) => {
    const { shoppingCart } = get();
    const updatedCart = removeCart(item.id, shoppingCart);
    set({ shoppingCart: updatedCart });
  },
  // (item: CartItem) =>
  //   set((state) => ({
  //     shoppingCart: state.shoppingCart.map((gift) => {
  //       if (gift.id === item.id) {
  //         if (gift.quantity <= 1) {
  //           state.removeItemFromCart(gift);

  //           const filteredCart = state.shoppingCart.filter(
  //             (gift) => gift.id !== item.id,
  //           );

  //           return filteredCart[0]!;
  //         }
  //         console.log("should decrement, if remove don't come here", gift);
  //         return { ...gift, quantity: gift.quantity - 1 };
  //       }
  //       console.log("nothing");
  //       return gift;
  //     }),
  //   })),
  removeItemFromCart: (item: CartItem) =>
    set((state) => ({
      shoppingCart: state.shoppingCart.filter((gift) => gift.id !== item.id),
    })),
}));

function updateCart(giftId: string, shoppingCart: CartItem[]): CartItem[] {
  const cartItem: CartItem = { id: giftId, quantity: 1 };

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
