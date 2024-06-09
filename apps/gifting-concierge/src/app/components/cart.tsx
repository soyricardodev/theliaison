import { kv } from "@vercel/kv";

export async function Cart({ params }: { params: { user: string } }) {
  const cart = await kv.get<{ id: string; quantity: number }[]>(params.user);

  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Cart</h1>
      {cart?.map((item) => (
        <div key={item.id}>
          <h2>{item.id}</h2>
          <p>{item.quantity}</p>
        </div>
      ))}
    </div>
  );
}
