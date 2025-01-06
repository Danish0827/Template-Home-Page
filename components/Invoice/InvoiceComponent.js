import React from "react";
import easyinvoice from "easyinvoice";

const InvoiceComponent = () => {
  const generateInvoice = async () => {
    const data = {
      apiKey: "free",
      mode: "development",
      images: {
        logo: "https://public.budgetinvoice.com/img/logo_en_original.png",
        background: "https://public.budgetinvoice.com/img/watermark-draft.jpg",
      },
      sender: {
        company: "Sample Corp",
        address: "Sample Street 123",
        zip: "1234 AB",
        city: "Sampletown",
        country: "Samplecountry",
      },
      client: {
        company: "Client Corp",
        address: "Clientstreet 456",
        zip: "4567 CD",
        city: "Clientcity",
        country: "Clientcountry",
      },
      information: {
        number: "2021.0001",
        date: "12-12-2021",
        dueDate: "31-12-2021",
      },
      products: [
        {
          quantity: 2,
          description: "Product 1",
          taxRate: 6,
          price: 33.87,
        },
        {
          quantity: 4.1,
          description: "Product 2",
          taxRate: 6,
          price: 12.34,
        },
        {
          quantity: 4.5678,
          description: "Product 3",
          taxRate: 21,
          price: 6324.453456,
        },
      ],
      bottomNotice: "Kindly pay your invoice within 15 days.",
      settings: {
        currency: "USD",
      },
    };

    try {
      const result = await easyinvoice.createInvoice(data);
      const pdfBase64 = result.pdf;

      // Download the PDF
      const link = document.createElement("a");
      link.href = `data:application/pdf;base64,${pdfBase64}`;
      link.download = "invoice.pdf";
      link.click();
    } catch (error) {
      console.error("Error generating invoice:", error);
    }
  };

  return (
    <div>
      <h1>Invoice Generator</h1>
      <button
        onClick={generateInvoice}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Generate Invoice
      </button>
    </div>
  );
};

export default InvoiceComponent;
