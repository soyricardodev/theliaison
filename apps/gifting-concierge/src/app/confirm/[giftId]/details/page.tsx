import ShippingForm from "./shipping-form";

export default function Page({
	params: { giftId },
}: {
	params: { giftId: string };
}) {
	return <ShippingForm giftId={giftId} />;
}
