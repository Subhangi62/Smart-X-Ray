import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface ContactEmailProps {
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
}

export const ContactEmail = ({
  senderName,
  senderEmail,
  subject,
  message,
}: ContactEmailProps) => (
  <Html>
    <Head />
    <Preview>New contact form submission from {senderName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Text style={heading}>New Contact Form Submission</Text>
          <Text style={subheading}>Smart X-Ray Interpretation System</Text>
          <Hr style={hr} />
          <Row>
            <Text style={label}>From:</Text>
            <Text style={value}>{senderName}</Text>
          </Row>
          <Row>
            <Text style={label}>Email:</Text>
            <Link href={`mailto:${senderEmail}`} style={link}>
              {senderEmail}
            </Link>
          </Row>
          <Row>
            <Text style={label}>Subject:</Text>
            <Text style={value}>{subject}</Text>
          </Row>
          <Hr style={hr} />
          <Section style={messageSection}>
            <Text style={label}>Message:</Text>
            <Text style={messageText}>{message}</Text>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            This email was sent from your Smart X-Ray contact form. Please reply directly to {senderEmail}
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#f0f7ff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen-Sans",Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "24px",
  border: "solid 2px #3b82f6",
  borderRadius: "8px",
  backgroundColor: "#fff",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "16px 0",
};

const heading = {
  fontSize: "24px",
  fontWeight: "600",
  color: "#1e40af",
  marginTop: "0",
  marginBottom: "4px",
};

const subheading = {
  fontSize: "14px",
  color: "#6b7280",
  marginTop: "0",
  marginBottom: "16px",
};

const label = {
  fontSize: "12px",
  fontWeight: "600",
  color: "#6b7280",
  margin: "8px 0 4px 0",
};

const value = {
  fontSize: "14px",
  color: "#111827",
  margin: "0 0 8px 0",
};

const link = {
  color: "#3b82f6",
  textDecoration: "underline",
};

const messageSection = {
  margin: "16px 0",
};

const messageText = {
  fontSize: "14px",
  color: "#111827",
  lineHeight: "1.6",
  whiteSpace: "pre-wrap" as const,
  margin: "0",
  padding: "12px",
  backgroundColor: "#f9fafb",
  borderRadius: "4px",
};

const footer = {
  fontSize: "12px",
  color: "#9ca3af",
  margin: "16px 0 0 0",
  fontStyle: "italic",
};
