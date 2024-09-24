export const menuItem = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "About",
    url: "/new-arrivals",
  },
  {
    name: "Men",
    url: "/men",
    dropdown: [
      {
        name: "T-Shirts",
        url: "/men/t-shirts",
      },
      { name: "Polo Shirts", url: "/men/polo-shirts" },
      {
        name: "Shirts",
        url: "/men/shirts",
        subMenuItem: [
          { name: "Formal Shirts", url: "/men/shirts/formal" },
          { name: "Casual Shirts", url: "/men/shirts/casual" },
          { name: "Denim Shirts", url: "/men/shirts/denim" },
          { name: "Printed Shirts", url: "/men/shirts/printed" },
        ],
      },
      {
        name: "Jeans",
        url: "/men/jeans",
        subMenuItem: [
          { name: "Formal Shirts", url: "/men/shirts/formal" },
          { name: "Casual Shirts", url: "/men/shirts/casual" },
          { name: "Denim Shirts", url: "/men/shirts/denim" },
          { name: "Printed Shirts", url: "/men/shirts/printed" },
        ],
      },
      { name: "Jackets", url: "/men/jackets" },
      { name: "Sweaters", url: "/men/sweaters" },
      { name: "Suits & Blazers", url: "/men/suits-blazers" },
    ],
  },
  {
    name: "Women",
    url: "/women",
    dropdown: [
      { name: "Tops", url: "/women/tops" },
      { name: "Dresses", url: "/women/dresses" },
      {
        name: "Outerwear",
        url: "/women/outerwear",
        subMenuItem: [
          { name: "Jackets", url: "/women/outerwear/jackets" },
          { name: "Coats", url: "/women/outerwear/coats" },
          { name: "Cardigans", url: "/women/outerwear/cardigans" },
          { name: "Sweatshirts", url: "/women/outerwear/sweatshirts" },
        ],
      },
      { name: "Skirts", url: "/women/skirts" },
      { name: "Jeans", url: "/women/jeans" },
      { name: "Accessories", url: "/women/accessories" },
    ],
  },
  {
    name: "Kids",
    url: "/kids",
    dropdown: [
      { name: "T-Shirts", url: "/kids/t-shirts" },
      { name: "Shorts", url: "/kids/shorts" },
      { name: "Jeans", url: "/kids/jeans" },
      { name: "Jackets", url: "/kids/jackets" },
      { name: "Sweatshirts", url: "/kids/sweatshirts" },
    ],
  },
  {
    name: "Shop",
    url: "/shop",
    megamenu: [
      {
        title: "Clothing",
        items: [
          { name: "T-Shirts", url: "/shop/clothing/t-shirts" },
          { name: "Sweaters", url: "/shop/clothing/sweaters" },
          { name: "Hoodies", url: "/shop/clothing/hoodies" },
          { name: "Denim", url: "/shop/clothing/denim" },
          { name: "Activewear", url: "/shop/clothing/activewear" },
        ],
      },
      {
        title: "Accessories",
        items: [
          { name: "Watches", url: "/shop/accessories/watches" },
          { name: "Belts", url: "/shop/accessories/belts" },
          { name: "Hats", url: "/shop/accessories/hats" },
          { name: "Sunglasses", url: "/shop/accessories/sunglasses" },
          { name: "Jewelry", url: "/shop/accessories/jewelry" },
        ],
      },
      {
        title: "Footwear",
        items: [
          { name: "Sneakers", url: "/shop/footwear/sneakers" },
          { name: "Boots", url: "/shop/footwear/boots" },
          { name: "Formal Shoes", url: "/shop/footwear/formal-shoes" },
          { name: "Sandals", url: "/shop/footwear/sandals" },
          { name: "Flip Flops", url: "/shop/footwear/flip-flops" },
        ],
      },
      {
        title: "Collections",
        items: [
          { name: "Summer Collection", url: "/shop/collections/summer" },
          { name: "Winter Collection", url: "/shop/collections/winter" },
          { name: "New Arrivals", url: "/shop/collections/new-arrivals" },
          { name: "Best Sellers", url: "/shop/collections/best-sellers" },
          { name: "Sale", url: "/shop/collections/sale" },
        ],
      },
      {
        title: "Collections",
        items: [
          { name: "Summer Collection", url: "/shop/collections/summer" },
          { name: "Winter Collection", url: "/shop/collections/winter" },
          { name: "New Arrivals", url: "/shop/collections/new-arrivals" },
          { name: "Best Sellers", url: "/shop/collections/best-sellers" },
          { name: "Sale", url: "/shop/collections/sale" },
        ],
      },
    ],
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Contact",
    url: "/contact",
  },
  {
    name: "FAQs",
    url: "/faqs",
  },
  {
    name: "Blog",
    url: "/blog",
  },
];

export const logo = 'https://www.cottonculture.co.in/cdn/shop/files/450_pixel.jpg?v=1726896523&width=130';
