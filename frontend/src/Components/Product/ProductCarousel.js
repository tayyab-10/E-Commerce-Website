import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const ProductCarousel = ({ images }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleStepChange = (step) => setActiveStep(step);

  return (
    <Box sx={{ maxWidth: '100%', flexGrow: 1 }}>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((image, index) => (
          <Box
            key={image.url}
            component="img"
            sx={{
              height: 355,
              display: 'block',
              maxWidth: '100%',
              overflow: 'hidden',
              width: '50vh',
            }}
            src={image.url}
            alt={`Image ${index + 1}`}
          />
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        sx={{ marginLeft: "7rem" }}
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        // nextButton={
        //   <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
        //     Next {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        //   </Button>
        // }
        // backButton={
        //   <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
        //     {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        //     Back
        //   </Button>
        // }
      />
    </Box>
  );
};

export default ProductCarousel;
