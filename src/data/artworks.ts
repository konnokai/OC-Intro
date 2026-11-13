import type { ImageMetadata } from 'astro';

import fanhuaMoonImage from '../assets/artworks/fanhua-moon.webp';
import adou6TogetherImage from '../assets/artworks/adou6-together.webp';
import adou6EmbraceImage from '../assets/artworks/adou6-embrace.webp';
import heimaoKoroImage from '../assets/artworks/heimao-koro.webp';
import heimaoYorayaImage from '../assets/artworks/heimao-yoraya.webp';

export interface Artwork {
  image: ImageMetadata;
  alt: string;
  artist: string;
  artistUrl?: string;
}

export const artworks = {
  fanhuaMoon: {
    image: fanhuaMoonImage,
    alt: '皎朧與夜綾背靠背坐在窗邊，窗外是圓月和塔',
    artist: '凡椛Fanhua',
    artistUrl: 'https://x.com/fanhua37',
  },
  adou6Together: {
    image: adou6TogetherImage,
    alt: '皎朧與夜綾並肩站在一起的雙人半身插圖',
    artist: '阿抖6',
    artistUrl: 'https://x.com/realadou6',
  },
  adou6Embrace: {
    image: adou6EmbraceImage,
    alt: '皎朧與夜綾相擁的雙人半身插圖',
    artist: '阿抖6',
    artistUrl: 'https://x.com/realadou6',
  },
  heimaoKoro: {
    image: heimaoKoroImage,
    alt: '皎朧提著燈的插圖',
    artist: '黑貓',
    artistUrl: 'https://x.com/bkmeow_',
  },
  heimaoYoraya: {
    image: heimaoYorayaImage,
    alt: '夜綾抱膝坐著的插圖',
    artist: '黑貓',
    artistUrl: 'https://x.com/bkmeow_',
  },
} satisfies Record<string, Artwork>;
