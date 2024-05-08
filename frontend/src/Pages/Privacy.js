// About.js

import { Container } from "@chakra-ui/react";
import React from "react";

const Privacy = () => {
  return (
    <main>
      <Container
        className="page section section-center"
        style={{ maxWidth: "80vw" }}
      >
        <h2 style={{ fontWeight: "bold" }}>Privacy Policy</h2>
        <br />
        <p>
          {" "}
          This Privacy Policy explains how T fad collects, uses, and protects
          your personal information as required by Cashfree payments rules and
          regulations and in accordance with Indian government guidelines. By
          accessing and using our website, you agree to the practices outlined
          in this policy.
        </p>
        <p>
          <strong>Information We CollectCollection and Use</strong>
        </p>
        <p>We collect and process the following types of information:</p>{" "}
        <p>
          {" "}
          a. *Personal Information:* When you create an account or place an
          order, we collect your name, email address, phone number, and shipping
          address.
        </p>
        <div>
          <p>
            {" "}
            b. *Payment Information:* We do not store your payment card details.
            All payment transactions are processed securely through Cashfree,
            our payment gateway partner.
          </p>
          <p>
            {" "}
            c. *Usage Data:* We gather data about how you navigate and interact
            with our website. This includes your IP address, browser type,
            device information, and pages visited.
          </p>
        </div>{" "}
        <p>
          <strong>*2. How We Use Your Information*</strong>
        </p>
        <p>We use your information for the following purposes:</p>
        <p>
          a. *Order Fulfillment:* To process and ship your orders, communicate
          order updates, and provide customer support.
        </p>
        <p>
          b. *Communication:* To send you transactional emails, updates, and
          promotional content based on your preferences.
        </p>
        <p>
          c. *Improvement:* To analyze usage patterns and improve our website,
          products, and services.
        </p>
        <p>
          <strong>Data Security</strong>
        </p>
        <p>
          We take security seriously and implement appropriate measures to
          protect your personal information. Our payment gateway partner,
          Cashfree, uses industry-standard security protocols to ensure the
          safety of payment transactions.
        </p>
        <p>
          <strong>*4. Third-Party Sharing*</strong>
        </p>
        <p>
          {" "}
          We do not sell, trade, or transfer your personal information to third
          parties for marketing purposes. However, we may share your information
          with service providers such as shipping companies to fulfill your
          orders.
        </p>
        <p>
          <strong>*5. Cookies and Tracking Technologies*</strong>
        </p>
        <p>
          We use cookies and similar technologies to enhance your browsing
          experience and gather usage data. You can manage your cookie
          preferences through your browser settings.
        </p>
        <p>
          <strong>*6. Your Rights*</strong>
        </p>
        <p>
          As per Indian government regulations, you have the right to access,
          update, and delete your personal information. You can do so by logging
          into your account or contacting our customer service team.
        </p>
        <p>
          <strong>*7. Changes to the Privacy Policy*</strong>
        </p>
        <p>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or for legal reasons. Any updates will be posted on
          our website, and the date of the latest revision will be indicated.
        </p>
        <p>
          <strong>*8. Contact Us*</strong>
        </p>
        <p>
          If you have any questions or concerns about your privacy or this
          Privacy Policy, please contact our Data Protection Officer at [DPO
          email address].
        </p>
        <p>
          This Privacy Policy is subject to Cashfree payments rules and
          regulations and Indian government guidelines and is effective as of
          [Effective Date].
        </p>
        <p>
          <strong>Contact Us</strong>
        </p>
        <p>
          <a href="https://tfad.in" className="blue" target="_blank">
            tfad.in
          </a>
        </p>
      </Container>
    </main>
  );
};

export default Privacy;
