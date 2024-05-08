// About.js

import { Container } from "@chakra-ui/react";
import React from "react";

const Refund = () => {
  return (
    <main>
      <Container className="page section section-center"  style={{maxWidth:'80vw'}}>
        <h2 style={{fontWeight:'bold'}}>Refund and Cancellation Policy</h2>
        <br/>
        <p>
          {" "}
          At T fad, we strive to provide you with the best shopping experience
          and high-quality products. This Refund and Cancellation Policy
          outlines the terms and conditions under which refunds and
          cancellations are processed for orders placed on our website.
        </p>

        <p>
          <strong>*1. Cancellation of Orders*</strong>
        </p>
        <p>
          You may cancel your order within 24 hours of placing it, provided that
          the order has not already been shipped. To cancel an order, please log
          in to your account and follow the cancellation instructions. If your
          order has already been shipped, our Return and Exchange Policy will
          apply.
        </p>

        <p>
          <strong>*2. Refund Eligibility*</strong>
        </p>

        <p>We offer refunds for the following situations:</p>
        <p>
          a. *Damaged or Defective Products:* If you receive a damaged or
          defective product, please contact our customer service within 3 days
          of receiving the item. We will provide instructions for returning the
          item and offer a replacement or a refund.
        </p>
        <p>
          b. *Incorrect Items:* If you receive an item different from what you
          ordered, please contact us within 7 days of receiving the item. We
          will arrange for the correct item to be shipped to you or offer a
          refund.
        </p>

        <p>
          <strong>*3. Refund Process*</strong>
        </p>

        <p>
          Once your return is received and inspected, we will send you an email
          to notify you of the approval or rejection of your refund. If your
          refund is approved, it will be processed within [number] business
          days, and a credit will automatically be applied to your original
          method of payment. Please note that shipping fees are non-refundable.
        </p>

        <p>
          <strong>*4. Return Shipping*</strong>
        </p>

        <p>
          For eligible returns, we will provide you with a prepaid shipping
          label or reimburse your return shipping costs, depending on the nature
          of the return. Please follow the instructions provided by our customer
          service team for returning items.
        </p>

        <p>
          <strong>*5. Non-Refundable Items*</strong>
        </p>

        <p>Certain items are non-refundable, including but not limited to:</p>
        <p> a. Items that have been used, washed, or altered.</p>
        <p> b. Items without their original tags and packaging.</p>
        <p> c. Items marked as "Final Sale" or "Non-Returnable."</p>

        <p>
          <strong>*6. Exchange Policy*</strong>
        </p>
        <p>
          If you wish to exchange an item for a different size, color, or style,
          please contact our customer service team within 6 days of receiving
          the item. We will guide you through the exchange process and assist
          you in placing a new order for the desired item.
        </p>

        <p>
          <strong>*7. Contact Us*</strong>
        </p>
        <p>
          If you have any questions or concerns regarding our Refund and
          Cancellation Policy, please contact our customer service team at +91
          7994472680.
        </p>
        <p>
          Please note that this policy applies only to purchases made on our
          website. Purchases made through other retail locations or platforms
          may be subject to different return and refund policies.
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

export default Refund;
