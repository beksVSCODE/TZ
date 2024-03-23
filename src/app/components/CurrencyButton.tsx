'use client'
import React, { useState } from 'react';
import { Stack, Typography, TextField, Button, Box, Container } from '@mui/material';
import Image from 'next/image';


const CurrencyButton = ({ currency, selectedCurrency, onClick }) => (
  <Box
    borderRadius='10px'
    display='flex'
    justifyContent='center'
    alignItems='center'
    height={40}
    width={80}
    sx={{
      backgroundColor: selectedCurrency === currency ? '#060e34' : 'transparent',
      color: selectedCurrency === currency ? 'white' : 'inherit',
      borderRadius: '10px',
    }}
    onClick={() => onClick(currency)}
  >
    <Stack direction='row' alignItems='center' spacing={0.6}>
      <Image src={`/${currency}.png`} width={30} height={30} />
      <p>{currency}</p>
    </Stack>
  </Box>
);
export default CurrencyButton