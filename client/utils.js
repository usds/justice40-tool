import colormap from 'colormap';

const min = 0; 
const max = 1; 
const steps = 10;
const ramp = colormap({
    colormap: 'freesurface-blue',
    nshades: steps
  });

 function clamp(value, low, high) {
   return Math.max(low, Math.min(value, high));
 }

function getColor(data) {
   const f = Math.pow(clamp((data - min) / (max - min), 0, 1), 1 / 2);
   const index = Math.round(f * (steps - 1));
   return ramp[index];
}

export default getColor;