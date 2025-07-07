"use client";
import React from "react";

const ContactInfo = () => {
  return (
    <main className="main-content bg-white py-16" id="MainContent">
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-black uppercase">
            Contact Information
          </h1>
        </div>

        <div className="text-lg text-black space-y-6">
          <p className="text-center">
            Your questions, Our answers. Send us your questions about products,
            returns/exchanges, or even your valuable feedback. We will answer
            you back in a jiffy.
          </p>
          <p className="text-center">
            Contact us: Monday to Saturday 10:00 AM to 7:00 PM
          </p>

          <p className="text-center">
            <strong>
              Instagram Support:{" "}
              <a
                href="https://www.instagram.com/cottonculture.co.in/"
                title="Cotton Culture Instagram"
                className="text-black hover:text-zinc-800 underline"
              >
                Click Here
              </a>
            </strong>
          </p>

          <p className="text-center">
            <strong>
              WhatsApp Support:{" "}
              <a
                href="https://api.whatsapp.com/send?phone=8277997646&text=Hello!"
                title="WhatsApp"
                className="text-black hover:text-zinc-800 underline"
              >
                Click Here
              </a>
            </strong>
          </p>

          <p className="text-center">
            <strong>
              Call us:{" "}
              <a
                href="tel:+918277997646"
                target="_blank"
                rel="noopener"
                className="text-black hover:text-zinc-800 underline"
              >
                +918277997646 / +91-9820535999
              </a>
            </strong>
          </p>

          <p className="text-center">
            <strong>
              E-mail:{" "}
              <a
                href="mailto:info@cottonculture.co.in"
                target="_blank"
                rel="noopener"
                className="text-black hover:text-zinc-800 underline"
              >
                info@cottonculture.co.in
              </a>
            </strong>
          </p>

          <p className="text-center">
            Thank you for visiting us. We are here to assist you.
          </p>
        </div>
      </div>
    </main>
  );
};

export default ContactInfo;
