import React, { useState } from "react";
import Layout from "@theme/Layout";

import HeroSection from "../components/homepage/HeroSection";
import Head from "@docusaurus/Head";
import ResourcesSection from "../components/homepage/ResourcesSection";

export default function Homepage() {
  return (
    <Layout
      description="Ben Braun (Arteii): Systems & Security Engineer and IT trainer near Frankfurt. Blog, docs and cheat sheets on Rust, Windows internals, kernel development and Linux."
      wrapperClassName="homepage flex flex-col"
    >
      <Head>
        <title>Ben Braun (Arteii) – Systems & Security Engineer</title>
        <meta name="msvalidate.01" content="4BE0AB5A8B5736126C93DE177CA2EC2F" />
        <meta name="yandex-verification" content="13d1cc1868fe2de2" />
        <meta
          property="og:title"
          content="Ben Braun (Arteii) – Systems & Security Engineer"
        />
        <meta property="og:type" content="website" />
        <meta name="author" content="Ben Braun" />
        <meta
          name="keywords"
          content="arteii, blog, documentation, linux, programming, windows, kernel, python"
        />
        <link rel="prefetch" href="/assets/css/elements.min.css" />
      </Head>

      <HeroSection />

      {/*<ResourcesSection />*/}
    </Layout>
  );
}
