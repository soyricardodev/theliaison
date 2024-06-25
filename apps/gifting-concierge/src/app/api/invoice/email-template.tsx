import type React from "react";

interface EmailTemplateProps {
	invoiceLink: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	invoiceLink,
}) => (
	<div>
		<h1>Hello, here is your gifting concierge invoice</h1>

		<div>
			<a
				href={invoiceLink}
				style={{ padding: 20, backgroundColor: "blue", color: "white" }}
			>
				Click here to pay your invoice.
			</a>
		</div>
	</div>
);

export default EmailTemplate;
