"use client";
import { Drawer } from "antd";
import React, { useState } from "react";
import Image from "next/image";

const AddCart = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <>
      <div>
        <Image
          onClick={showDrawer}
          className="cursor-pointer hover:scale-110 transition-all ease-linear"
          height={23}
          width={23}
          src="/svgs/cart.svg"
          alt="cart"
        />
      </div>
      <Drawer
        title={<p className="text-4xl p-3">Cart</p>}
        width={520}
        placement="right"
        onClose={onClose}
        open={open}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default AddCart;
