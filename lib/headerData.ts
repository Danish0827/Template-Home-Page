import Paragraph from "antd/es/skeleton/Paragraph";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaPinterest,
  FaSnapchat,
  FaTiktok,
  FaReddit,
  FaWhatsapp,
  FaTelegram,
  FaVimeo,
  FaFlickr,
  FaTumblr,
  FaGithub,
  FaDribbble,
  FaBehance,
  FaMedium,
  FaSlack,
  FaDiscord,
  FaSkype,
} from "react-icons/fa";

const topAnnouncement = {
  Isannouncement: true,
  announcement: [
    {
      id: 1,
      heading: "Get 500/- OFF* INSTANTLY ON PURCHASE OF RS. 3999/- OR MORE",
      url: "/store-locator",
    },
    {
      id: 2,
      heading: "FREE SHIPPING ORDERS ABOVE 499.",
      url: "/franchise",
    },
    {
      id: 3,
      heading: " FREE SHIPPING OR DETAIL SHIPPING",
      url: "/track-your-order",
    },
  ],
};

const headerMedia = {
  Ismedia: true,
  media: [
    {
      id: 1,
      heading: "Store Locator",
      url: "/store-locator",
    },
    {
      id: 2,
      heading: "Franchise",
      url: "/franchise",
    },
    {
      id: 3,
      heading: "Track Your Order",
      url: "/track-your-order",
    },
  ],
};

const headerIcons = {
  Isicon: true,
  icon: [
    { id: 1, icon: FaFacebook, url: "https://www.facebook.com" },
    // { id: 2, icon: FaTwitter, url: "https://www.twitter.com" },
    // { id: 3, icon: FaInstagram, url: "https://www.instagram.com" },
    // { id: 4, icon: FaLinkedin, url: "https://www.linkedin.com" },
    // { id: 5, icon: FaYoutube, url: "https://www.youtube.com" },
    // { id: 6, icon: FaPinterest, url: "https://www.pinterest.com" }, //https://www.pinterest.com
    // { id: 7, icon: FaSnapchat, url: "" }, //https://www.snapchat.com
    // { id: 8, icon: FaTiktok, url: "https://www.tiktok.com" },
    // { id: 9, icon: FaReddit, url: "" }, //https://www.reddit.com
    // { id: 10, icon: FaWhatsapp, url: "" }, //https://www.whatsapp.com
    // { id: 11, icon: FaTelegram, url: "" }, //https://www.telegram.org
    // { id: 12, icon: FaVimeo, url: "" }, //https://www.vimeo.com
    // { id: 13, icon: FaFlickr, url: "" }, //https://www.flickr.com
    // { id: 14, icon: FaTumblr, url: "" }, //https://www.tumblr.com
    // { id: 15, icon: FaGithub, url: "" }, //https://www.github.com
    // { id: 16, icon: FaDribbble, url: "" }, //https://www.dribbble.com
    // { id: 17, icon: FaBehance, url: "" }, // https://www.behance.net
    // { id: 18, icon: FaMedium, url: "" }, //https://www.medium.com
    // { id: 19, icon: FaSlack, url: "" }, //https://www.slack.com
    // { id: 20, icon: FaDiscord, url: "" }, // https://www.discord.com
    // { id: 21, icon: FaSkype, url: "" }, // https://www.skype.com
  ],
};

const headers = {
  brandName: "SagarTech",
  logo: "https://bovinosbck.demo-web.live/wp-content/uploads/2024/12/shoes-logo-design-template-e21760dc27d8a44fe578b7acf2e2bad2_screen-e1733218316459.jpg",
  content:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  // navbar: [
  //   {
  //     id: 1,
  //     heading: "Kurtas",
  //     url: "/header",
  //   },
  //   {
  //     id: 2,
  //     heading: "Co ord set",
  //     url: "/franchise",
  //   },
  //   {
  //     id: 3,
  //     heading: "Dupatta",
  //     url: "/track-your-order",
  //     IssubItems:true,
  //     subItems: [
  //       {
  //         id: 1,
  //         heading: "Chiffon dupatta",
  //         url: "/store-locator",
  //       },
  //       {
  //         id: 2,
  //         heading: "Cotton dupatta",
  //         url: "/franchise",
  //         IssubItems:true,
  //         subSubItems: [
  //           {
  //             id: 1,
  //             heading: "Black",
  //             url: "/store-locator",
  //           },
  //           {
  //             id: 2,
  //             heading: "Pink",
  //             url: "/franchise",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     heading: "second",
  //     url: "/track-your-order",
  //     IssubItems:true,
  //     subItems: [
  //       {
  //         id: 1,
  //         heading: "xyz",
  //         url: "/store-locator",
  //       },
  //       {
  //         id: 2,
  //         heading: "abc",
  //         url: "/franchise",
  //       },
  //     ],
  //   },
  //   {
  //     id: 5,
  //     heading: "Contact",
  //     url: "/contact",
  //   },
  // ],
  Islogin: true,
  IsSearch: true,
  IsCart: true,
};

const quickLinks = [
  {
    IsQuickLinks: true,
    linksHeading: "Quick Links",
    links: [
      {
        id: 1,
        heading: "Terms of Service",
        url: "policies/terms-of-service",
      },
      {
        id: 2,
        heading: "Shipping Policy",
        url: "policies/shipping-policy",
      },
      {
        id: 3,
        heading: "Refund Policy",
        url: "policies/refund-policy",
      },
      {
        id: 4,
        heading: "Privacy Policy",
        url: "policies/privacy-policy",
      },
      // {
      //   id: 5,
      //   heading: "Track Your Order",
      //   url: "track-your-order",
      // },
      {
        id: 6,
        heading: "Blogs",
        url: "blogs",
      },
      {
        id: 7,
        heading: "About Us",
        url: "about",
      },
      {
        id: 8,
        heading: "Contact Us",
        url: "contact",
      },
      // {
      //   id: 9,
      //   heading: "Place Return/Exchange Request",
      //   url: "return-exchange-request",
      // },
    ],
  },
  {
    IsQuickLinks: true,
    linksHeading: "Our Category",
    links: [
      {
        id: 1,
        heading: "Co ord Sets",
        url: "co-ord-sets",
      },
      {
        id: 2,
        heading: "Dupatta",
        url: "dupatta",
      },
      {
        id: 3,
        heading: "Ethnic Suits",
        url: "ethnic-suits",
      },
      {
        id: 4,
        heading: "Kurtas",
        url: "kurtas",
      },
      {
        id: 5,
        heading: "Kurtis | Tunic",
        url: "kurtis-tunic",
      },
      {
        id: 6,
        heading: "Trending Now",
        url: "trending-now",
      },
      {
        id: 7,
        heading: "New In",
        url: "new-in",
      },
      {
        id: 8,
        heading: "Discount",
        url: "discount",
      },
    ],
  },
];

const contactInfo = {
  IscontactInfo: true,
  contactInfoName: "Contact Info",
  IsSubscribe: true,
  subscribe:
    "Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.",
};

const downloadStore = {
  IsdownStore: true,
  storeImage: [
    {
      id: 1,
      image:
        "https://cdn.shopify.com/s/files/1/0883/8204/6526/files/images.png?v=1723884996",
      url: "https://apps.apple.com/in/app/cotton-culture/id6633427304",
    },
    {
      id: 2,
      image:
        "https://cdn.shopify.com/s/files/1/0883/8204/6526/files/images.png?v=1723884996",
      url: "https://apps.apple.com/in/app/cotton-culture/id6633427304",
    },
  ],
};

const products = [
  {
    id: 1,
    title: "Pista Green Slub Rayon Straight Embroidered Kurta",
    price: "Rs. 1,199.00",
    productUrl: "/single",
    images: [
      {
        primary:
          "//www.cottonculture.co.in/cdn/shop/files/QahiraPistaGreen1.jpg?v=1725883367&width=1080",
        secondary:
          "//www.cottonculture.co.in/cdn/shop/files/QahiraPistaGreen5.jpg?v=1725883367&width=1000",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  },
  {
    id: 2,
    title: "Maroon Floral Print A-Line Dress",
    price: "Rs. 1,299.00",
    productUrl: "/single",
    images: [
      {
        primary:
          "https://www.cottonculture.co.in/cdn/shop/files/MAHESHDUPATTAD711.jpg?v=1726899487&width=360",
        secondary:
          "https://www.cottonculture.co.in/cdn/shop/files/MANSIBLACK2.jpg?v=1726140833&width=1000",
      },
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 3,
    title: "Navy Blue Cotton Printed Kurta",
    price: "Rs. 999.00",
    productUrl: "/single",
    images: [
      {
        primary:
          "https://www.cottonculture.co.in/cdn/shop/files/PRAMITAPURPLE1.jpg?v=1725878424&width=1080",
        secondary:
          "https://www.cottonculture.co.in/cdn/shop/files/PRAMITAPURPLE5.jpg?v=1725878424&width=1000",
      },
    ],
    sizes: ["M", "L", "XL", "XXL"],
  },
  {
    id: 4,
    title: "Yellow Striped Sleeveless Top",
    price: "Rs. 799.00",
    productUrl: "/single",
    images: [
      {
        primary:
          "https://www.cottonculture.co.in/cdn/shop/files/g_71.jpg?v=1726201461&width=540",
        secondary:
          "https://www.cottonculture.co.in/cdn/shop/files/PARIWHITE5.jpg?v=1726142247&width=1000",
      },
    ],
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: 5,
    title: "Black Solid Ankle Length Pants",
    price: "Rs. 1,099.00",
    productUrl: "/single",
    images: [
      {
        primary:
          "//www.cottonculture.co.in/cdn/shop/files/QahiraPistaGreen1.jpg?v=1725883367&width=1080",
        secondary:
          "//www.cottonculture.co.in/cdn/shop/files/QahiraPistaGreen5.jpg?v=1725883367&width=1000",
      },
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 6,
    title: "Olive Green Shirt Dress",
    price: "Rs. 1,499.00",
    productUrl: "/single",
    images: [
      {
        primary:
          "//www.cottonculture.co.in/cdn/shop/files/QahiraPistaGreen1.jpg?v=1725883367&width=1080",
        secondary:
          "//www.cottonculture.co.in/cdn/shop/files/QahiraPistaGreen5.jpg?v=1725883367&width=1000",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 7,
    title: "Beige Printed Palazzo Pants",
    price: "Rs. 899.00",
    productUrl: "/single",
    images: [
      {
        primary:
          "//www.cottonculture.co.in/cdn/shop/files/QahiraPistaGreen1.jpg?v=1725883367&width=1080",
        secondary:
          "//www.cottonculture.co.in/cdn/shop/files/QahiraPistaGreen5.jpg?v=1725883367&width=1000",
      },
    ],
    sizes: ["M", "L", "XL", "XXL"],
  },
  {
    id: 8,
    title: "Red Checkered Shirt",
    price: "Rs. 1,099.00",
    productUrl: "/single",
    images: [
      {
        primary:
          "//www.cottonculture.co.in/cdn/shop/files/QahiraPistaGreen1.jpg?v=1725883367&width=1080",
        secondary:
          "//www.cottonculture.co.in/cdn/shop/files/QahiraPistaGreen5.jpg?v=1725883367&width=1000",
      },
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 9,
    title: "White Embroidered Tunic",
    price: "Rs. 1,399.00",
    productUrl: "/single",
    images: [
      {
        primary:
          "//www.cottonculture.co.in/cdn/shop/files/QahiraPistaGreen1.jpg?v=1725883367&width=1080",
        secondary:
          "//www.cottonculture.co.in/cdn/shop/files/QahiraPistaGreen5.jpg?v=1725883367&width=1000",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 10,
    title: "Peach Solid Casual Kurta",
    price: "Rs. 1,299.00",
    productUrl: "/single",
    images: [
      {
        primary:
          "//www.cottonculture.co.in/cdn/shop/files/QahiraPistaGreen1.jpg?v=1725883367&width=1080",
        secondary:
          "//www.cottonculture.co.in/cdn/shop/files/QahiraPistaGreen5.jpg?v=1725883367&width=1000",
      },
    ],
    sizes: ["S", "M", "L", "XL"],
  },
];

const siyafySlider = {
  IsSlider: true,
  Slider: [
    {
      id: 1,
      image:
        "https://www.cottonculture.co.in/cdn/shop/files/COTTON_CULTURE_WEBSITE_BANNER_16.png?v=1726929006&width=1920",
      heading: "Get 500/- OFF* INSTANTLY ON PURCHASE OF RS. 3999/- OR MORE",
      paragraph: "Lorem ldfn nfdjflk fjadjf lorem ",
      url: "/store-locator",
    },
    {
      id: 2,
      image:
        "https://www.cottonculture.co.in/cdn/shop/files/COTTON_CULTURE_WEBSITE_BANNER_17.png?v=1726929005&width=1920",
      heading: "FREE SHIPPING ORDERS ABOVE 499.",
      paragraph: "Lorem ldfn nfdjflk fjadjf lorem ",
      url: "/franchise",
    },
    {
      id: 3,
      image:
        "https://www.cottonculture.co.in/cdn/shop/files/COTTON_CULTURE_WEBSITE_BANNER_1_fda86686-f4c0-403a-b27d-3ead83abd70f.png?v=1726928640&width=1920",
      heading: " FREE SHIPPING OR DETAIL SHIPPING",
      paragraph: "Lorem ldfn nfdjflk fjadjf lorem ",
      url: "/track-your-order",
    },
    {
      id: 4,
      image:
        "https://www.cottonculture.co.in/cdn/shop/files/COTTON_CULTURE_WEBSITE_BANNER_22.png?v=1726929007&width=1920",
      heading: " FREE SHIPPING OR DETAIL SHIPPING",
      paragraph: "Lorem ldfn nfdjflk fjadjf lorem ",
      url: "/track-your-order",
    },
  ],
};
const shopCategories = {
  IsShoCategories: true,
  categoriesHeading: "Shop by Category",
  categories: [
    {
      name: "Kurtas",
      href: "/collections/kurtas",
      imgSrc:
        "//www.cottonculture.co.in/cdn/shop/files/AMENAPINK1.jpg?v=1726806036&width=1080",
      imgAlt: "Off White & Pink Jaipuri Cotton Printed Flared Sleeveless Kurta",
    },
    {
      name: "Co-ord Sets",
      href: "/collections/co-ord-sets",
      imgSrc:
        "//www.cottonculture.co.in/cdn/shop/files/POURNIMAOFFWHITE1.jpg?v=1726726412&width=1080",
      imgAlt:
        "Off White Cotton Flax Straight Embroidered Kurta Pant Co ord Set",
    },
    {
      name: "Dupattas",
      href: "/collections/dupatta",
      imgSrc:
        "//www.cottonculture.co.in/cdn/shop/files/MAHESHDUPATTAD711.jpg?v=1726899487&width=1080",
      imgAlt: "Dupatta",
    },
    {
      name: "Ethnic Suits",
      href: "/collections/ethnic-suits",
      imgSrc:
        "//www.cottonculture.co.in/cdn/shop/files/AnamikaWhite1.jpg?v=1726634972&width=1080",
      imgAlt: "White Georgette Straight Embroidered Kurta Palazzo Suit Set",
    },
    {
      name: "Short Kurtis",
      href: "/collections/short-kurtis",
      imgSrc:
        "//www.cottonculture.co.in/cdn/shop/files/NeysaShortCream1.jpg?v=1726807730&width=1080",
      imgAlt: "Cream Cotton Straight Embroidered Short Kurta",
    },
    // {
    //   name: "Short Kurtis",
    //   href: "/collections/short-kurtis",
    //   imgSrc: "//www.cottonculture.co.in/cdn/shop/files/NeysaShortCream1.jpg?v=1726807730&width=1080",
    //   imgAlt: "Cream Cotton Straight Embroidered Short Kurta",
    // },
  ],
};

const backgroundData = {
  imageUrl:
    "//www.cottonculture.co.in/cdn/shop/files/COTTON_CULTURE_BANNER_1349_x_500_px_5.png?v=1722059799",
  heading: "Impressive",
  subheading: "COLLECTIONS FOR FESTIVALS & PARTIES",
  description:
    "Attend parties in stunning clothes and celebrate the festive season in unmatched elegance. Find your perfect outfit for styling best.",
  buttonText: "Shop Now",
  buttonLink: "/collections/ethnic-suits",
};
const iconData = [
  {
    title: "Free Shipping",
    text: "Orders above 499/-",
    imageUrl: "./ProcessType/delivery-truck.png",
  },
  {
    title: "Money Guarantee",
    text: "Within 15 days for an exchange.",
    imageUrl: "./ProcessType/delivery-truck.png",
  },
  {
    title: "Online Support",
    text: "10 AM - 7 PM, Mon - Sat",
    imageUrl: "./ProcessType/delivery-truck.png",
  },
  {
    title: "Cash On Delivery",
    text: "Worry-free shopping experience.",
    imageUrl: "./ProcessType/delivery-truck.png",
  },
  {
    title: "Secure Payment",
    text: "Pay with Multiple Payment Platform",
    imageUrl: "./ProcessType/delivery-truck.png",
  },
];

const filters = [
  {
    label: "Availability",
    key: "availability",
    options: [
      { label: "In stock (58)", type: "checkbox" },
      { label: "Out of stock (44)", type: "checkbox" },
    ],
  },
  {
    label: "Price",
    key: "price",
    options: [
      {
        type: "range",
        min: 0,
        max: 1449,
        labels: { min: "Rs. 0.00", max: "Rs. 1,449.00" },
      },
    ],
  },
  {
    label: "Size",
    key: "size",
    options: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"].map((size) => ({
      label: size,
      type: "checkbox",
    })),
  },
  {
    label: "Color",
    key: "color",
    options: [
      { label: "Beige", color: "rgb(241, 194, 125)", type: "checkbox" },
      { label: "Yellow", color: "rgb(242, 229, 2)", type: "checkbox" },
    ],
  },
];

const ProductPage = [
  {
    src: "//www.cottonculture.co.in/cdn/shop/files/ashira-cc112-311023-light-purple-1.jpg?v=1721303387&width=1080",
    alt: "Light Purple Georgette Flared Embroidered Kurta Pant Suit Set - 1",
  },
  {
    src: "//www.cottonculture.co.in/cdn/shop/files/1j8a9778.jpg?v=1721303387&width=1080",
    alt: "Light Purple Georgette Flared Embroidered Kurta Pant Suit Set - 2",
  },
  {
    src: "//www.cottonculture.co.in/cdn/shop/files/ashira-cc112-311023-light-purple-2.jpg?v=1721303387&width=1080",
    alt: "Light Purple Georgette Flared Embroidered Kurta Pant Suit Set - 3",
  },
  {
    src: "//www.cottonculture.co.in/cdn/shop/files/ashira-cc112-311023-light-purple-3.jpg?v=1721303387&width=1080",
    alt: "Light Purple Georgette Flared Embroidered Kurta Pant Suit Set - 4",
  },
];

const cartData = {
  key: "50195998212414:43dc2e987ef349a7fe32fdbfa1dc1473",
  product: {
    name: "Light Purple Georgette Flared Embroidered kurta Pant Suit Set",
    size: "XS",
    image:
      "//www.cottonculture.co.in/cdn/shop/files/ashira-cc112-311023-light-purple-1.jpg?v=1721303387",
    price: 1899.5,
    link: "/products/ashira-light-purple-georgette-embroidered-suit-set?variant=50195998212414",
  },
  quantity: 1,
};

export {
  topAnnouncement,
  headerMedia,
  headerIcons,
  headers,
  quickLinks,
  downloadStore,
  contactInfo,
  products,
  siyafySlider,
  shopCategories,
  backgroundData,
  iconData,
  filters,
  ProductPage,
  cartData,
};
