import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";

export const metadata = {
  title: "Product Studio Community",
  description: "A community of past and present Tufts students in product",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Theme appearance="dark" accentColor="blue" radius="full">
          <main>{children}</main>
        </Theme>
      </body>
    </html>
  );
}
