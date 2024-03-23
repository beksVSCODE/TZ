"use client"
import { useState } from 'react';
import { Stack, Typography, TextField, Button, Box, Container, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import CurrencyButton from './components/CurrencyButton'
interface WalletInfo {
  address: string;
  balanceETH: number;
  balanceBNB: number;
}

const WalletPage = () => {
  const [walletInfo, setWalletInfo] = useState<WalletInfo>({
    address: '0xYourAddress',
    balanceETH: 10,
    balanceBNB: 230,
  });
  const [transactionAddress, setTransactionAddress] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<'ETH' | 'BNB'>('ETH');
  const isScreenSmall = useMediaQuery('(max-width:460px)');
  const handleTransactionSubmit = () => {
    if (transactionAddress.trim() === '' || !transactionAddress.includes('@')) {
      console.error('Invalid recipient address');
      return;
    }
    // Допустим, здесь происходит отправка транзакции
    try {
      // Логика отправки транзакции
      console.log('Transaction submitted to:', transactionAddress);
      // Если произошла ошибка, можно обработать ее здесь
    } catch (error) {
      console.error('Transaction failed:', error.message);
      // Отобразить сообщение пользователю о том, что транзакция не удалась
    }
  };
  
  
  const handleCurrencyChange = (currency: 'ETH' | 'BNB') => {
    setSelectedCurrency(currency);
  };

  return (
    <Container maxWidth="sm" sx={{display:'flex', justifyContent:'center'}}>
        <Box width='600px' borderRadius={8} bgcolor='white' padding='25px 20px'> 
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
                        <Typography variant="body1"  sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        Address: {walletInfo.address}
                        </Typography>
                  </Stack>
                ) : (
                  <Stack direction='row' spacing={1.2} alignItems='center'>
                    <CurrencyButton currency="BNB" selectedCurrency={selectedCurrency} onClick={handleCurrencyChange} />
                    <CurrencyButton currency="ETH" selectedCurrency={selectedCurrency} onClick={handleCurrencyChange} />
                    <Typography variant="body1"  sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      Address: {walletInfo.address}
                    </Typography>
                  </Stack>
                )}
                <Stack spacing={1}>
                    <Typography variant="body3" fontSize='20px'>
                        Balance: {selectedCurrency === 'BNB' ? walletInfo.balanceBNB : walletInfo.balanceETH}
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
0xf3431019606c99f363d1D1A9D5465C3538dA0D69