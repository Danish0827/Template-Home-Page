// pages/terms.js
import React from "react";

const TermsOfService = () => {
  return (
    <main className="main-content px-4 py-8" id="MainContent">
      <div className="container mx-auto max-w-2xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-black tracking-tight uppercase">
            Terms of Service
          </h1>
        </header>

        <div className="shopify-policy__body text-black">
          <div className="rte">
            <p className="mb-4">
              <b>OVERVIEW </b>
              <br />
              This website is operated by Cotton Culture. Throughout the site,
              the terms “we”, “us” and “our” refer to Cotton Culture. Cotton
              Culture offers this website, including all information, tools and
              Services available from this site to you, the user, conditioned
              upon your acceptance of all terms, conditions, policies and
              notices stated here.
            </p>
            <p className="mb-4">
              By visiting our site and/or purchasing something from us, you
              engage in our “Service” and agree to be bound by the following
              terms and conditions (“Terms of Service”, “Terms”), including
              those additional terms and conditions and policies referenced
              herein and/or available by hyperlink. These Terms of Service apply
              to all users of the site, including without limitation users who
              are browsers, vendors, customers, merchants, and/or contributors
              of content.
            </p>
            <p className="mb-4">
              Please read these Terms of Service carefully before accessing or
              using our website. By accessing or using any part of the site, you
              agree to be bound by these Terms of Service. If you do not agree
              to all the terms and conditions of this agreement, then you may
              not access the website or use any Services. If these Terms of
              Service are considered an offer, acceptance is expressly limited
              to these Terms of Service.
            </p>
            <p className="mb-4">
              Any new features or tools which are added to the current store
              shall also be subject to the Terms of Service. You can review the
              most current version of the Terms of Service at any time on this
              page. We reserve the right to update, change or replace any part
              of these Terms of Service by posting updates and/or changes to our
              website. It is your responsibility to check this page periodically
              for changes. Your continued use of or access to the website
              following the posting of any changes constitutes acceptance of
              those changes.
            </p>
            <p className="mb-4">
              <b>ONLINE STORE TERMS&nbsp;</b>
              <br />
              By agreeing to these Terms of Service, you represent that you are
              at least the age of majority in your state or province of
              residence, or that you are the age of majority in your state or
              province of residence and you have given us your consent to allow
              any of your minor dependents to use this site.
            </p>
            <p className="mb-4">
              You may not use our products for any illegal or unauthorized
              purpose nor may you, in the use of the Service, violate any laws
              in your jurisdiction (including but not limited to copyright
              laws). You must not transmit any worms or viruses or any code of a
              destructive nature. A breach or violation of any of the Terms will
              result in an immediate termination of your Services.
            </p>
            {/* Add more paragraphs as needed */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default TermsOfService;
