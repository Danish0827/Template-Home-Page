import React from 'react'
import HeaderV1 from '@/components/Headers/HeaderV1/HeaderV1'
import ColorPallete from '@/components/Pallete/ColorPallete'
import FooterV1 from "@/components/Footers/FooterV1/FooterV1";
import PrivacyPolicy from '@/components/Policies/PrivacyPolicy';

const privicy = () => {
  return (
    <>
       <ColorPallete />
      <HeaderV1 />
      <PrivacyPolicy />
      <FooterV1 />
    </>
  )
}

export default privicy
