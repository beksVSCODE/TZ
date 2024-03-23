'use client'
import { useState, useEffect } from 'react';
import { Stack, Typography, TextField, Button, Box, Container, useMediaQuery } from '@mui/material';
import Web3 from 'web3';
import { toast, ToastContainer } from 'react-toastify';
import CurrencyButton from '@/app/components/CurrencyButton';
import 'react-toastify/dist/ReactToastify.css';

interface WalletInfo {
  address: string;
  balanceETH: number;
  balanceBNB: number;
}

const WalletPage = () => {
  const [walletInfo, setWalletInfo] = useState<WalletInfo>({
    address: 'Loading...',
    balanceETH: 0,
    balanceBNB: 0,
  });

  useEffect(() => {
    const connectToMetamask = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3 = new Web3(window.ethereum);
          return web3;
        } catch (error) {
          console.error('Ошибка подключения к Metamask:', error);
          toast.error('Ошибка подключения к Metamask');
          return null;
        }
      } else {
        console.error('Metamask не найден');
        toast.error('Metamask не найден');
        return null;
      }
    };

    const fetchWalletInfo = async () => {
      const web3 = await connectToMetamask();
      if (web3) {
        try {
          const accounts = await web3.eth.getAccounts();
          const address = accounts[0];
          const balanceETH = await web3.eth.getBalance(address);
          const balanceBNB = await web3.eth.getBalance(address);
          setWalletInfo({
            address,
            balanceETH: web3.utils.fromWei(balanceETH, 'ether'),
            balanceBNB:  web3.utils.fromWei(balanceBNB, 'ether')
          });
        } catch (error) {
          console.error('Ошибка при получении информации о кошельке:', error);
          toast.error('Ошибка при получении информации о кошельке');
        }
      }
    };

    fetchWalletInfo();
  }, []);

  const [transactionAddress, setTransactionAddress] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<'ETH' | 'BNB'>('ETH');
  const isScreenSmall = useMediaQuery('(max-width:660px)');

  const handleTransactionSubmit = () => {
    if (transactionAddress.trim() === '' || !transactionAddress.includes('@')) {
      console.error('Invalid recipient address');
      toast.error('Invalid recipient address');
      return;
    }
    console.log('Transaction submitted to:', transactionAddress);
    toast.success('Transaction submitted successfully');
  };

  const handleCurrencyChange = (currency: 'ETH' | 'BNB') => {
    setSelectedCurrency(currency);
  };


  return (
    <Container maxWidth="xl" sx={{display:'flex', justifyContent:'center'}}>
      <ToastContainer />
      <Box width="100%" maxWidth="600px" borderRadius={8} bgcolor='white' padding='25px 15px'> 
          <Stack spacing={2}>
              <Typography variant="h5" align="center" gutterBottom>
                  Wallet Information
              </Typography>
              {isScreenSmall ? (
                <Stack direction='column' spacing={1.2} alignItems='center'>
                      <Stack direction='row' justifyContent='start'>
                            <CurrencyButton currency="BNB" selectedCurrency={selectedCurrency} onClick={handleCurrencyChange} />
                            <CurrencyButton currency="ETH" selectedCurrency={selectedCurrency} onClick={handleCurrencyChange} />
                      </Stack>
                      <Typography variant="body1"  sx={{ fontWeight: 'bold', color: 'primary.main', fontSize:'12px'}}>
                        Address: {walletInfo.address}
                      </Typography>
                </Stack>
              ) : (
                <Stack direction='row' spacing={1.2} alignItems='center'>
                            <CurrencyButton currency="BNB" selectedCurrency={selectedCurrency} onClick={handleCurrencyChange} />
                            <CurrencyButton currency="ETH" selectedCurrency={selectedCurrency} onClick={handleCurrencyChange} />
                  <Typography variant="body1"  sx={{ fontWeight: 'bold', color: 'primary.main', fontSize:'12px'}}>
                        Address: {walletInfo.address}
                  </Typography>
                </Stack>
              )}
              <Stack spacing={1}>
                  <Typography variant="body3" fontSize='20px'>
                      Balance {selectedCurrency === 'BNB' ? 'BNB' : 'ETH'}: {selectedCurrency === 'BNB' ? walletInfo.balanceBNB : walletInfo.balanceETH}
                  </Typography>
              </Stack>
              <TextField
                  label="Recipient Address"
                  variant="outlined"
                  fullWidth
                  size='small'
                  value={transactionAddress}
                  onChange={(e) => setTransactionAddress(e.target.value)}
              />
              <Box textAlign="start" >
              <Button  sx={{ backgroundColor: '#2737aa', color: 'white', }}  variant="contained" disableElevation onClick={handleTransactionSubmit}>
                  Send
              </Button>
              </Box>
              <Typography variant="body3" fontSize='12px' color='gray'>
                      1,00 {selectedCurrency} = {selectedCurrency === 'ETH' ? '3434,00 USD' : '552,83 USD'}
              </Typography>
          </Stack>
      </Box>
  </Container>
  );
};

export default WalletPage;
