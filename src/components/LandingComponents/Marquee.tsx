// src/components/LandingComponents/Marquee.tsx
import React from 'react';
// Replace these with your actual icon paths
import SlackIcon from '../../assets/images/slack-icon.svg';
import JiraIcon from '../../assets/images/jira.svg';
import MicrosoftIcon from '../../assets/images/microsoft.svg';
import AppleIcon from '../../assets/images/node-js.svg';
import ReactIcon from '../../assets/images/react.svg';
import Google from '../../assets/images/google.svg';
import Mongo from '../../assets/images/mongodb-original-wordmark.svg';
import Figma from '../../assets/images/figma.svg';
import Paypal from '../../assets/images/paypal.svg';
import Python from '../../assets/images/python.svg';
import stripe from '../../assets/images/stripe.svg';
// import openAi from '../../assets/images/openai.svg';
import Marquee from "react-fast-marquee";
import Tailwind from '../../assets/images/tailwind-css.svg';
import Laravel from '../../assets/images/laravel-plain-wordmark.svg';
import Sass from '../../assets/images/file-type-sass.svg';
import Docker from '../../assets/images/docker.svg';
import Typescript from '../../assets/images/typescript-icon.svg';
import Javascript from '../../assets/images/javascript-js.svg';
import aws from '../../assets/images/aws.svg';

const icons = [
  aws, SlackIcon, JiraIcon, MicrosoftIcon, AppleIcon, ReactIcon,
  Google, Mongo, Figma, Paypal, Python, stripe,
  Tailwind, Laravel, Sass, Docker, Typescript, Javascript,
];

const ToolMarquee: React.FC = () => (
  <div className="overflow-hidden pl-6 pr-6 whitespace-nowrap py-6 bg-transparent">
    <Marquee>
      <div className="inline-flex animate-marquee">
        {/** Render icons twice for seamless loop */}
        {[...icons, ...icons].map((src, idx) => (
          <div key={idx} className="mx-8 flex-shrink-0">
            <img src={src} alt="" className="h-10 w-auto opacity-80 hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </Marquee>
  </div>
);

export default ToolMarquee;
