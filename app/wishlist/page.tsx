import FooterV1 from '@/components/Footers/FooterV1/FooterV1'
import HeaderV1 from '@/components/Headers/HeaderV1/HeaderV1'
import ColorPallete from '@/components/Pallete/ColorPallete'
import WishProduct from '@/components/WishProduct/WishProduct'

import React from 'react'

const wishlist = () => {
  return (
    <div>
     <ColorPallete />
      <HeaderV1 />
      <WishProduct />
      <FooterV1 />
    </div>
  )
}

export default wishlist
