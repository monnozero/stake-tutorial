'use client'
import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Spinner } from '@chakra-ui/react';
import { useApiContext } from '@/providers/ApiProvider';
import { SUPPORTED_NETWORKS } from '@/utils/networks';
import Image from 'next/image';

function NetworkStatusIndicator() {
  const { apiReady } = useApiContext();

  if (apiReady) {
    return <Box borderRadius='50%' width={3} height={3} backgroundColor='green.500' />;
  } else {
    return <Spinner size='xs' />;
  }
}

export default function NetworkSelection() {
  const { network, setNetwork } = useApiContext();


  return (
    <Menu autoSelect={false} >
      <MenuButton as={Button} flexShrink={0} backgroundColor={'#89d7e9'} rounded={'full'}   _hover={{
              shadow: "md",
              backgroundColor: "#C8F5FF",
            }}>
        <Flex direction='row' align='center' gap={2} >
          <Image src={network.logo} alt={network.name} width={22} height={22} style={{ borderRadius: 4 }} />
          <Box flexShrink={0}>
            <NetworkStatusIndicator />
          </Box>
        </Flex>
      </MenuButton>
      <MenuList>
        {Object.values(SUPPORTED_NETWORKS).map((one) => (
          <MenuItem
            key={one.id}
            onClick={() => setNetwork(one)}
            backgroundColor={one.id === network.id ? 'gray.200' : ''}>
            <Flex direction='row' align='center' gap={2}>
              <span>{one.name}</span>
            </Flex>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
