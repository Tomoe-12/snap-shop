import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { ShoppingBasket } from "lucide-react";
import * as React from "react";

interface emailConfirmationTemplateProps {
  userFirstname?: string;
  confirmEmailLink?: string;
}

// const baseUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : "";

export const emailConfirmationTemplateProps = ({
  userFirstname,
  confirmEmailLink,
}: emailConfirmationTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Confirm Your Account - Welcome to SnapShop</Preview>
      <Body style={main}>
        <Container style={container}>
          <ShoppingBasket width={40} height={40} />
          <Section>
            <Text style={text}>Hi {userFirstname},</Text>
            <Text style={text}>
             We received a account registeration request with this email address .
            </Text>
            <Button style={button} href={confirmEmailLink}>
              Activate Account 
            </Button>
            <Text style={text}>
              To keep your account secure, please don&apos;t forward this email
              to anyone. See our Help Center for{" "}
              <Link style={anchor} href='/'>
                more security tips.
              </Link>
            </Text>
            <Text style={text}>Happy Shopping!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

emailConfirmationTemplateProps.PreviewProps = {
  userFirstname: "Snap Shop",
  confirmEmailLink: "/",
} as emailConfirmationTemplateProps;

export default emailConfirmationTemplateProps;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

const anchor = {
  textDecoration: "underline",
};
