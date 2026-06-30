import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import {
  DocumentRegular,
  OpenRegular,
  ArrowDownloadRegular,
} from "@fluentui/react-icons";

export default function ResumeHub() {
  return (
    <Layout
      title="Document Hub"
      description="Access or download my CV and Resume"
      wrapperClassName="homepage flex flex-col"
    >
      <main className="mx-auto max-w-5xl p-4 py-12 font-jakarta">
        <header className="mb-12 max-w-2xl">
          <h1 className="mb-2 text-3xl font-bold text-black dark:text-white">
            Document Hub
          </h1>
          <p className="text-text-400 text-base">
            Access up-to-date versions of my professional background profile.
            Select your preferred asset and format below.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col justify-between rounded-lg border-2 border-text-400/10 p-6 bg-background-surface dark:border-text-400/20">
            <div>
              <h3 className="mb-2 font-bold text-lg text-black dark:text-white border-b border-text-400/10 pb-2">
                Curriculum Vitae
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="/download/CV.pdf"
                download
                className="flex items-center justify-center gap-2 rounded-lg bg-primary py-2 px-4 font-semibold text-white transition-colors hover:bg-primary/90 no-underline"
              >
                <ArrowDownloadRegular className="h-5 w-5" /> Download PDF
              </a>
              <a
                href="/download/CV.html"
                download
                className="flex items-center justify-center gap-2 rounded-lg border-2 border-text-400/20 py-2 px-4 font-semibold text-text-400 transition-colors hover:border-primary hover:text-primary no-underline"
              >
                <OpenRegular className="h-4 w-4" /> HTML Format
              </a>
              <a
                href="/download/CV.md"
                download
                className="flex items-center justify-center gap-2 rounded-lg border-2 border-text-400/20 py-2 px-4 font-semibold text-text-400 transition-colors hover:border-primary hover:text-primary no-underline"
              >
                <DocumentRegular className="h-4 w-4" /> Markdown Format
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-lg border-2 border-text-400/10 p-6 bg-background-surface dark:border-text-400/20">
            <div>
              <h3 className="mb-2 font-bold text-lg text-black dark:text-white border-b border-text-400/10 pb-2">
                Resume
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="/download/RESUME.pdf"
                download
                className="flex items-center justify-center gap-2 rounded-lg bg-primary py-2 px-4 font-semibold text-white transition-colors hover:bg-primary/90 no-underline"
              >
                <ArrowDownloadRegular className="h-5 w-5" /> Download PDF
              </a>
              <a
                href="/download/RESUME.html"
                download
                className="flex items-center justify-center gap-2 rounded-lg border-2 border-text-400/20 py-2 px-4 font-semibold text-text-400 transition-colors hover:border-primary hover:text-primary no-underline"
              >
                <OpenRegular className="h-4 w-4" /> HTML Format
              </a>
              <a
                href="/download/RESUME.md"
                download
                className="flex items-center justify-center gap-2 rounded-lg border-2 border-text-400/20 py-2 px-4 font-semibold text-text-400 transition-colors hover:border-primary hover:text-primary no-underline"
              >
                <DocumentRegular className="h-4 w-4" /> Markdown Format
              </a>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
