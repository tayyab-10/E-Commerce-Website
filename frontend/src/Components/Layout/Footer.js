import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import playStore from "../../images/playstore.png";
import appStore from "../../images/Appstore.png";

const Footer = () => {
  return (
    <Box className="bg-gray-900 text-white py-6">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <div className="flex items-center">
              <ShoppingCartIcon className="hidden md:flex text-red-500 mr-2" />
              <Typography variant="h6" gutterBottom className="font-bold text-red-500 text-lg">
                ShopSmart
              </Typography>
            </div>
            <Typography variant="body2" color="inherit" className="mt-2 text-sm">
              ShopSmart is your go-to destination for all your shopping needs. Discover a wide range of products at unbeatable prices and enjoy a seamless shopping experience.
            </Typography>
          </Grid>

          <Grid item xs={6} sm={2} md={2}>
            <Typography variant="h6" gutterBottom className="text-sm">
              Resources
            </Typography>
            <a href="/blog" className="block text-white hover:text-red-500 text-sm mt-1">Blog</a>
            <a href="/faqs" className="block text-white hover:text-red-500 text-sm mt-1">FAQs</a>
            <a href="/support" className="block text-white hover:text-red-500 text-sm mt-1">Support</a>
          </Grid>

          <Grid item xs={6} sm={2} md={2}> 
            <Typography variant="h6" gutterBottom className="text-sm">
              Company
            </Typography>
            <a href="/about" className="block text-white hover:text-red-500 text-sm mt-1">About Us</a>
            <a href="/careers" className="block text-white hover:text-red-500 text-sm mt-1">Careers</a>
            <a href="/contact" className="block text-white hover:text-red-500 text-sm mt-1">Contact</a>
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <div className="flex flex-col items-center">
              <Typography variant="h6" className="text-sm">
                DOWNLOAD OUR APP
              </Typography>
              <Typography variant="body2" className="text-xs text-center mt-1">
                Download App for Android and iOS mobile phones
              </Typography>
              <div className="flex mt-2 space-x-2">
                <img src={playStore} alt="playstore" className="w-24 h-auto cursor-pointer" />
                <img src={appStore} alt="Appstore" className="w-24 h-auto cursor-pointer" />
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <Typography variant="h6" gutterBottom className="text-sm">
              Follow Us
            </Typography>
            <div className="flex mt-1 space-x-2">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-500">
                <Facebook />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-500">
                <Twitter />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-500">
                <LinkedIn />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-500">
                <Instagram />
              </a>
            </div>
          </Grid>
        </Grid>
        <Box textAlign="center" pt={3}>
          <Typography variant="body2" color="inherit" className="text-sm">
            &copy; {new Date().getFullYear()} ShopSmart. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
