"use client";

import {
  Badge,
  Card,
  Flex,
  Grid,
  Heading,
  Section,
  Text,
} from "@radix-ui/themes";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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

const CommunityContainer = () => {
  const [people, setPeople] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const { data: people } = await supabase!
        .from("people")
        .select()
        .order("created_at", { ascending: false })
        .limit(20);

      if (people) {
        setPeople(people);
      }
      setLoading(false);
    })();
  }, []);

  // if (loading) {
  //   return <h2>Loading...</h2>;
  // }

  return (
    <>
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
          <Flex align="center" justify="center" direction="column" gap="2">
            <Heading size="8" align="center">
              Tufts Product Studio Community
            </Heading>
            <Text align="center">
              A community of past and present Tufts students in design, product
              and engineering
            </Text>
          </Flex>
        </motion.div>
      </Section>
      {!loading && (
        <motion.div
          initial={{
            y: "30px",
            opacity: 0,
            filter: "blur(2px)",
          }}
          animate={{ y: "0px", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "30px", opacity: 0, filter: "blur(2px)" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0, 0.71, 0.2, 1.01] }}
        >
          <Grid
            columns={{
              initial: "2",
              xs: "2",
              sm: "3",
              md: "4",
              lg: "5",
              xl: "7",
            }}
            gap={{
              initial: "2",
              xs: "2",
              sm: "3",
              md: "4",
            }}
            width="auto"
          >
            {people.map((person: any) => {
              return (
                <Card>
                  <Flex direction="column" gap="2">
                    <Text>{person.name}</Text>
                    <Text>Class of {person.grad_year}</Text>
                    <Flex direction="row" gap="2" wrap="wrap">
                      {person.domains &&
                        person.domains.map((domain: string) => {
                          return (
                            <Badge variant="soft" color="indigo" radius="large">
                              {domain}
                            </Badge>
                          );
                        })}
                    </Flex>
                  </Flex>
                </Card>
              );
            })}
          </Grid>
        </motion.div>
      )}
    </>
  );
};

export default CommunityContainer;
