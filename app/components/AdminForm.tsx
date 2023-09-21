"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import {
  TextField,
  Button,
  Heading,
  RadioGroup,
  TextArea,
  Text,
  Section,
  Flex,
  Card,
  Grid,
  Container,
  Box,
  Checkbox,
  Dialog,
} from "@radix-ui/themes";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { UploadIcon } from "@radix-ui/react-icons";
import Input from "./Input";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase URL or Anon Key is missing in environment variables"
  );
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

type DomainProps = {
  domain: string;
};

const Domain = (props: DomainProps) => {
  const { domain } = props;

  return (
    <Flex>
      <Text size="2">
        <label>
          <Checkbox mr="1" /> {domain}
        </label>
      </Text>
    </Flex>
  );
};

interface FormData {
  name: string;
  grad_year: string;
  domains: string[];
  image_url: string;
  website_url: string;
  linkedin_url: string;
}

const domains = [
  "Product Design",
  "Product Management",
  "Product Engineer",
  "Product Marketing",
  "UX Design",
  "Visual Design",
  "Content Strategist",
  "Graphic Design",
  "UX Research",
  "UX Engineer",
  "Full Stack Engineer",
  "Web Developer",
];

const AdminForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    grad_year: "",
    domains: [],
    image_url: "",
    website_url: "",
    linkedin_url: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      const { data, error } = await supabase.storage
        .from("people_profile_pics")
        .upload(`profile_images/${file.name}`, file);

      if (error) {
        console.error("Error uploading file:", error);
      } else {
        setFormData((prevData) => ({
          ...prevData,
          image_url: data.path,
        }));
      }
    }
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from("person").insert([
        {
          name: formData.name,
          grad_year: parseInt(formData.grad_year),
          domains: formData.domains.split(",").map((domain) => domain.trim()),
          image_url: formData.image_url,
          website_url: formData.website_url,
          linkedin_url: formData.linkedin_url,
        },
      ]);

      if (error) {
        console.error("Error creating a new person:", error);
      } else {
        alert("Success");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
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
              <Heading weight="medium" size="5">
                Add Profile
              </Heading>
              <Card
                size="4"
                style={{
                  borderRadius: 8,
                  display: "grid",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Flex direction="row" gap="2" align="center">
                  <UploadIcon color="gray" />
                  <Text size="2" color="gray">
                    Upload image
                  </Text>
                </Flex>
              </Card>
              <Grid columns="2" gap="4">
                <Input
                  label="Name"
                  placeholder="John Doe"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <Input
                  label="Grad Year"
                  placeholder="20XX"
                  name="grad_year"
                  value={formData.grad_year}
                  onChange={handleChange}
                  number
                />
              </Grid>
              <Input
                label="LinkedIn URL"
                placeholder="https://linkedin.com/in/johndoe"
                name="linkedin_url"
                value={formData.linkedin_url}
                onChange={handleChange}
              />
              <Input
                label="Other URL"
                placeholder="https://personalsite.com"
                name="website_url"
                value={formData.website_url}
                onChange={handleChange}
              />
              <Flex direction="column" gap="2">
                <Text size="2" color="gray">
                  Domains / Specialties (check all that apply)
                </Text>
                <Grid columns="2" gap="2">
                  {domains.map((domain) => {
                    return <Domain domain={domain} />;
                  })}
                </Grid>
              </Flex>
              <Input
                label="Or input custom domains as comma-separated values"
                placeholder="design engineer, marketing lead, etc."
                name="website_url"
                value={formData.website_url}
                onChange={handleChange}
              />
              <Grid columns={{ initial: "1", lg: "2" }} gap="4">
                <Dialog.Root>
                  <Dialog.Trigger>
                    <Button variant="soft" radius="medium">
                      Preview
                    </Button>
                  </Dialog.Trigger>

                  <Dialog.Content style={{ maxWidth: 450 }}>
                    <Dialog.Title>Edit profile</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                      Make changes to your profile.
                    </Dialog.Description>

                    <Flex direction="column" gap="3">
                      <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                          Name
                        </Text>
                        <TextField.Input
                          defaultValue="Freja Johnsen"
                          placeholder="Enter your full name"
                        />
                      </label>
                      <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                          Email
                        </Text>
                        <TextField.Input
                          defaultValue="freja@example.com"
                          placeholder="Enter your email"
                        />
                      </label>
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                      <Dialog.Close>
                        <Button variant="soft" color="gray">
                          Cancel
                        </Button>
                      </Dialog.Close>
                      <Dialog.Close>
                        <Button>Save</Button>
                      </Dialog.Close>
                    </Flex>
                  </Dialog.Content>
                </Dialog.Root>
                <Button variant="solid" radius="medium">
                  Submit profile
                </Button>
              </Grid>
            </Flex>
          </Card>
        </Container>
      </motion.div>
    </Section>
  );
};

export default AdminForm;
