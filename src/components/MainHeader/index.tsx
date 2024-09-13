"use client";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import React from "react";
import AccountSelection from "@/components/AccountSelection";

import { useWalletContext } from "@/providers/WalletProvider";
import NetworkSelection from "@/components/NetworkSelection";
import WalletSelection from "@/components/WalletSelection";
import MenuNavigate from "@/components/MainHeader/MenuNavigate";


export default function MainHeader() {
  const { injectedApi } = useWalletContext();

  return (
    <Box borderBottom={1} borderStyle="solid" borderColor="gray.200">
      <Container
        maxWidth="full"
        px={4}
        mx="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={4}
        h={16}
      >
        <MenuNavigate/>
        <Flex gap={2}>
        <NetworkSelection />

          {injectedApi ? <AccountSelection /> : <WalletSelection />}
         
        </Flex>
      </Container>
    </Box>
  );
}
