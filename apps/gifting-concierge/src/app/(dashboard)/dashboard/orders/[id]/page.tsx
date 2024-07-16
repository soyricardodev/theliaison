export default function Component({
	params: { id },
}: {
	params: { id: string };
}) {
	return <div>Order {id}</div>;
}
