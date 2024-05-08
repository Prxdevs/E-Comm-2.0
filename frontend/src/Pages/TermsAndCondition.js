// About.js

import { Container } from "@chakra-ui/react";
import React from "react";

const TermsAndCondition = () => {
  return (
    <main>
      {/* <PageHero title="Termsandconditions" /> */}
      <Container className="page section section-center" style={{maxWidth:'80vw'}}>
        <h1 style={{fontWeight:'bold'}}>Terms and Conditions</h1>
        <br/>
        <p>
          {" "}
          Welcome to T fad These terms and conditions outline the rules and
          regulations for the use of our website and the purchase of products
          from our online store. By accessing this website and/or making a
          purchase, you agree to comply with and be bound by these terms. Please
          read them carefully before proceeding.
        </p>

        <p>
          <strong>*1. Acceptance of Terms*</strong>
        </p>
        <p>
          By accessing and using our website, you acknowledge that you have
          read, understood, and agree to be bound by these terms and conditions.
          If you do not agree with any part of these terms, please do not use
          our website.
        </p>

        <p>
          <strong>*2. Online Store*</strong>
        </p>

        <p>
          We offer a range of clothing products through our online store. These
          products may be subject to limited availability and may only be
          purchased for personal, non-commercial use. We reserve the right to
          modify or discontinue products without prior notice.
        </p>

        <p>
          <strong>*3. Pricing and Payment*</strong>
        </p>

        <p>
          All prices listed on our website are in [Currency] and inclusive of
          applicable taxes unless otherwise stated. We reserve the right to
          change prices at any time without notice. Payments are processed
          securely through our chosen payment gateway. By making a purchase, you
          agree to provide accurate payment and contact information. Orders are
          only shipped upon successful payment authorization.
        </p>

        <p>
          <strong>*4. Shipping and Delivery*</strong>
        </p>

        <p>
          Please review our Shipping and Delivery Policy for information
          regarding shipping methods, costs, and estimated delivery times. We
          are not responsible for any delays caused by shipping carriers or
          customs clearance.
        </p>

        <p>
          <strong>*5. Returns and Exchanges*</strong>
        </p>

        <p>
          We take pride in the quality of our products. If you receive a damaged
          or defective item, please contact our customer service within [number]
          days of receiving the product. Please review our Returns and Exchanges
          Policy for detailed instructions on how to return or exchange items.{" "}
        </p>

        <p>
          <strong>*6. Intellectual Property*</strong>
        </p>
        <p>
          All content on our website, including but not limited to text,
          graphics, logos, images, and software, is protected by intellectual
          property laws and is the property of [Your Ecommerce Store Name]. You
          may not use, reproduce, distribute, or modify any content without our
          prior written consent.
        </p>

        <p>
          <strong>*7. User Accounts*</strong>
        </p>
        <p>
          To make a purchase, you may be required to create an account on our
          website. You are responsible for maintaining the confidentiality of
          your account information and password. You agree to notify us
          immediately of any unauthorized use of your account.
        </p>

        <p>
          <strong>*8. Privacy Policy*</strong>
        </p>
        <p>
          Your privacy is important to us. Please review our Privacy Policy to
          understand how we collect, use, and safeguard your personal
          information.{" "}
        </p>

        <p>
          <strong>*9. Limitation of Liability*</strong>
        </p>
        <p>
          In no event shall [Your Ecommerce Store Name] be liable for any
          indirect, incidental, special, consequential, or punitive damages
          arising out of or related to your use or inability to use our website
          or products.{" "}
        </p>

        <p>
          <strong>*10. Governing Law*</strong>
        </p>
        <p>
          These terms and conditions are governed by and construed in accordance
          with the laws of [Your Country/State]. Any disputes arising from these
          terms will be subject to the exclusive jurisdiction of the courts in
          [Your Jurisdiction].
        </p>
        <p>
          By using our website and making a purchase, you acknowledge that you
          have read, understood, and agree to these terms and conditions. If you
          have any questions or concerns, please contact our customer service
          team.
        </p>
        <br />
        <p>These terms and conditions were last updated on 25-08-2023.</p>

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

export default TermsAndCondition;
