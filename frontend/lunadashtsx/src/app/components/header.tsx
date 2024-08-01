'use client';

import React from 'react';

import styles from '@/app/components/Header.module.scss';
import HeaderMobile from './headermobile';
import Image from 'next/image';
import LunaLogo from '../public/lunalogo.png'


const Header = () => {
  return (
      <div id={styles.headerContainer}>
          <Image src={LunaLogo} alt='Luna Logo' width={110} height={110} />
          <HeaderMobile />
      </div>
  );
};

export default Header; 