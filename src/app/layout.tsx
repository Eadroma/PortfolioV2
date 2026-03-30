import type { Metadata } from "next";
import { ClientProviders } from "@/components/ClientProviders";
import userConfig from "@/config/user.json";
import "./globals.css";

export const metadata: Metadata = {
  title: userConfig.name,
  description: "Full Stack Developer Portfolio",
  icons: {
    icon: `https://github.com/${userConfig.githubUsername}.png`,
    apple: `https://github.com/${userConfig.githubUsername}.png`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className="antialiased">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
