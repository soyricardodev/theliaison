import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Preview,
	Section,
	Text,
} from "@react-email/components";

interface SupaAuthVerifyEmailProp {
	verificationCode?: string;
}

export default function SupaAuthVerifyEmail({
	verificationCode = "596853",
}: SupaAuthVerifyEmailProp) {
	return (
		<Html>
			<Head />
			<Preview>The Liaison Email Verification</Preview>
			<Body style={main}>
				<Container style={container}>
					<Section style={coverSection}>
						<Section style={imageSection} />
						<Section style={upperSection}>
							<Heading style={h1}>
								The Liaison Verify your email address
							</Heading>
							<Text style={mainText}>
								{
									"Thanks for registering for an account on The Liaison! Before we get started, we just need to confirm that this is you. Copy the code below and paste it into the verification field when prompted. If you don&apos;t want to create an account, you can ignore this message."
								}
							</Text>
							<Section style={verificationSection}>
								<Text style={verifyText}>Verification code</Text>

								<Text style={codeText}>{verificationCode}</Text>
								<Text style={validityText}>
									(This code is valid for 1 hour)
								</Text>
							</Section>
						</Section>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}

const main = {
	backgroundColor: "#fff",
	color: "#212121",
};

const container = {
	padding: "20px",
	margin: "0 auto",
	backgroundColor: "#eee",
};

const h1 = {
	color: "#333",
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	fontSize: "20px",
	fontWeight: "bold",
	marginBottom: "15px",
};

const _link = {
	color: "#2754C5",
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	fontSize: "14px",
	textDecoration: "underline",
};

const text = {
	color: "#333",
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	fontSize: "14px",
	margin: "24px 0",
};

const imageSection = {
	backgroundColor: "#252f3d",
	display: "flex",
	padding: "20px 0",
	alignItems: "center",
	justifyContent: "center",
};

const coverSection = { backgroundColor: "#fff" };

const upperSection = { padding: "25px 35px" };

const _lowerSection = { padding: "25px 35px" };

const _footerText = {
	...text,
	fontSize: "12px",
	padding: "0 20px",
};

const verifyText = {
	...text,
	margin: 0,
	fontWeight: "bold",
	textAlign: "center" as const,
};

const codeText = {
	...text,
	fontWeight: "bold",
	fontSize: "36px",
	margin: "10px 0",
	textAlign: "center" as const,
};

const validityText = {
	...text,
	margin: "0px",
	textAlign: "center" as const,
};

const verificationSection = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

const mainText = { ...text, marginBottom: "14px" };
