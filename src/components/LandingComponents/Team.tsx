"use client";
import React from 'react';
import { HeroParallax } from '../hero-parallax';

export interface Product {
  title: string;
  link: string;
  thumbnail: string;
}

export const products: Product[] = [
  {
    title: 'Moonbeam',
    link: 'https://gomoonbeam.com',
    thumbnail: 'https://aceternity.com/images/products/thumbnails/new/moonbeam.png',
  },
  {
    title: 'Cursor',
    link: 'https://cursor.so',
    thumbnail: 'https://aceternity.com/images/products/thumbnails/new/cursor.png',
  },
  {
    title: 'Rogue',
    link: 'https://userogue.com',
    thumbnail: 'https://aceternity.com/images/products/thumbnails/new/rogue.png',
  },
  {
    title: 'Editorially',
    link: 'https://editorially.org',
    thumbnail: 'https://aceternity.com/images/products/thumbnails/new/editorially.png',
  },
  {
    title: 'Editrix AI',
    link: 'https://editrix.ai',
    thumbnail: 'https://aceternity.com/images/products/thumbnails/new/editrix.png',
  },
  {
    title: 'Pixel Perfect',
    link: 'https://app.pixelperfect.quest',
    thumbnail: 'https://aceternity.com/images/products/thumbnails/new/pixelperfect.png',
  },
  {
    title: 'Algochurn',
    link: 'https://algochurn.com',
    thumbnail: 'https://aceternity.com/images/products/thumbnails/new/algochurn.png',
  },
  {
    title: 'Aceternity UI',
    link: 'https://ui.aceternity.com',
    thumbnail: 'https://aceternity.com/images/products/thumbnails/new/aceternityui.png',
  },
  {
    title: 'Tailwind Master Kit',
    link: 'https://tailwindmasterkit.com',
    thumbnail: 'https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png',
  },
  {
    title: 'SmartBridge',
    link: 'https://smartbridgetech.com',
    thumbnail: 'https://aceternity.com/images/products/thumbnails/new/smartbridge.png',
  },

];

const HeroParallaxDemo: React.FC = () => {
  return <HeroParallax products={products} />;
};

export default HeroParallaxDemo;
