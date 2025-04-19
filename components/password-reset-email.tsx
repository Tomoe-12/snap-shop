import {
  Body,
  Container,
  Column,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { Button } from "./ui/button";

interface ResetPasswordEmail {
  username?: string;
  updatedDate?: Date;
  resetPasswordLink?: string;
}

//   const baseUrl = process.env.VERCEL_URL
//     ? `https://${process.env.VERCEL_URL}`
//     : "";

export const ResetPasswordEmail = ({
  username,
  updatedDate,
  resetPasswordLink,
}: ResetPasswordEmail) => {
  const formattedDate = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(updatedDate);

  return (
    <Html>
      <Head />
      <Preview>
        You requested to updated the password for your SnapShop account
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            <h2 style={logoTitle}>SnapShop</h2>
          </Section>
          <Section style={sectionsBorders}>
            <Row>
              <Column style={sectionBorder} />
              <Column style={sectionCenter} />
              <Column style={sectionBorder} />
            </Row>
          </Section>
          <Section style={content}>
            <Text style={paragraph}>Hi,{username}</Text>
            <Text style={paragraph}>
              You updated the password for your SnapShop account on{" "}
              {formattedDate}. If this was you, then no further action is
              required.
            </Text>
            <Text style={paragraph}>
              However if you did NOT perform this password change, please reset
              your account password immediately.
            </Text>
            <Link href={resetPasswordLink} style={link}>
              <Button style={button}>Reset password</Button>
            </Link>{" "}
            <Text style={paragraph}>
              Still have questions? Please contact{" "}
              <Link href="#" style={link}>
                SnapShop Support
              </Link>
            </Text>
            <Text style={paragraph}>
              Thanks,
              <br />
              SnapShop Support Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

ResetPasswordEmail.PreviewProps = {
  username: "SnapShop's User",
  updatedDate: new Date("June 23, 2022 4:06:00 pm UTC"),
} as ResetPasswordEmail;

export default ResetPasswordEmail;

const fontFamily = "HelveticaNeue,Helvetica,Arial,sans-serif";

const main = {
  backgroundColor: "#efeef1",
  fontFamily,
};
const button = {
  backgroundColor: "#22c55e",
  border : 'none',
  color : 'white',
  padding : '15px 32px',
  textAlign : 'center' as const,
  textDecoration : 'none',
  display : 'inline-block',
  fontSize : '16px',
  cursor : 'pointer'
};
const paragraph = {
  lineHeight: 1.5,
  fontSize: 14,
};

const container = {
  maxWidth: "580px",
  margin: "30px auto",
  backgroundColor: "#ffffff",
};

const footer = {
  maxWidth: "580px",
  margin: "0 auto",
};

const content = {
  padding: "5px 20px 10px 20px",
};

const logo = {
  display: "flex",
  justifyContent: "center",
  alingItems: "center",
  padding: 30,
};
const logoTitle = {
  fontSize: "35px",
  fontWeight: "600",
  color: "#22c55e",
};
const sectionsBorders = {
  width: "100%",
  display: "flex",
};

const sectionBorder = {
  borderBottom: "1px solid #22c55e",
  width: "249px",
};

const sectionCenter = {
  borderBottom: "1px solid #22c55e",
  width: "102px",
};

const link = {
  textDecoration: "underline",
};
