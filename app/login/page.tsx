"use client";

import Link from "next/link";
import Messages from "./messages";
import {
  Badge,
  Button,
  Card,
  Container,
  Flex,
  Section,
} from "@radix-ui/themes";
import { motion } from "framer-motion";
import { useState } from "react";
import Input from "../components/Input";
import { useRouter } from "next/navigation";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const processedFormData = new FormData();
      processedFormData.append("email", formData.email);
      processedFormData.append("password", formData.password);

      const response = await fetch("/auth/sign-in", {
        method: "POST",
        body: processedFormData,
      });

      if (response.ok) {
        setError(undefined);
        const data = await response.json();
        router.push(data.url);
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Link href="/">
        <Button size="1" variant="soft" style={{ cursor: "pointer" }}>
          Back to home
        </Button>
      </Link>
      <Section>
        <motion.div
          initial={{
            y: "30px",
            opacity: 0,
            filter: "blur(2px)",
          }}
          animate={{ y: "0px", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "30px", opacity: 0, filter: "blur(2px)" }}
          transition={{ duration: 0.8, ease: [0, 0.71, 0.2, 1.01] }}
        >
          <Container size="1">
            <Card size="2">
              <Flex direction="column" gap="4" width="100%">
                <Input
                  label="Email"
                  placeholder="johndoe@gmail.com"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <Input
                  label="Password"
                  placeholder="••••••••••••••••"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  password
                />
                {error && (
                  <Badge color="red" radius="medium" size="1" variant="soft">
                    {error}
                  </Badge>
                )}
                <Button variant="solid" radius="medium" onClick={handleSubmit}>
                  Log in
                </Button>
              </Flex>
            </Card>
          </Container>
        </motion.div>
      </Section>
    </div>
  );
}
