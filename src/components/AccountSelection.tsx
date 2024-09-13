'use client'
import { Box, Button, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import ConnectedWallet from '@/components/ConnectedWallet';
import WalletSelection, { ButtonStyle } from '@/components/WalletSelection';
import useBalances from '@/hooks/useBalances';
import useDisplayAddress from '@/hooks/useDisplayAddress';
import { useApiContext } from '@/providers/ApiProvider';
import { useWalletContext } from '@/providers/WalletProvider';
import { formatBalance, shortenAddress } from '@/utils/string';
import { ChevronDownIcon } from '@chakra-ui/icons';
import Image from 'next/image';

export default function AccountSelection() {
  const { accounts, injectedApi, selectedAccount, setSelectedAccount, signOut, connectedWallet } = useWalletContext();
  const { network } = useApiContext();
  const addresses = useMemo(() => accounts.map((a) => a.address), [accounts]);
  const balances = useBalances(addresses);

  const displayAddress = useDisplayAddress(selectedAccount?.address);

  useEffect(() => {
    if (selectedAccount && accounts.map((one) => one.address).includes(selectedAccount.address)) {
      return;
    }

    setSelectedAccount(accounts[0]);
  }, [accounts, selectedAccount, setSelectedAccount]);

  if (!selectedAccount) {
    return <></>;
  }

  const { name, address } = selectedAccount;

  return (
    <Box >
      <Menu autoSelect={false}>
        <MenuButton as={Button} backgroundColor={'#89d7e9'} rounded={'full'}   _hover={{
              shadow: "md",
              backgroundColor: "#C8F5FF",
            }}>
          <Flex align='center' gap={2}>
            
            <Text fontSize='sm' fontWeight='500' textColor={"#026262"}>
              {shortenAddress(displayAddress)}
            </Text>
            <ChevronDownIcon fontSize='xl' />
          </Flex>
        </MenuButton>

        <MenuList>
          <ConnectedWallet />

          {accounts.map((one) => (
            <MenuItem
              backgroundColor={one.address === address ? 'gray.200' : ''}
              gap={2}
              key={one.address}
              onClick={() => setSelectedAccount(one)}>
              <Flex direction='column'>
                <Text fontWeight='500'>{one.name}</Text>

                <Text fontSize='xs'>Address: {shortenAddress(one.address)}</Text>
                <Text fontSize='xs'>
                  Balance: {formatBalance(balances[one.address]?.free) || '0'} {network.symbol}
                </Text>
              </Flex>
            </MenuItem>
          ))}
          <MenuDivider />
          <WalletSelection
            buttonStyle={ButtonStyle.MENU_ITEM}
            buttonLabel='Switch Wallet'
            buttonProps={{ color: 'primary.500' }}
          />
          <MenuItem onClick={signOut} color='red.500'>
            Sign Out
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
