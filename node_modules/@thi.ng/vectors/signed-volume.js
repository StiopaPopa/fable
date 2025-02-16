const signedVolume = (a, b, c, [dx, dy, dz]) => {
  const ady = a[1] - dy;
  const bdy = b[1] - dy;
  const cdy = c[1] - dy;
  const adz = a[2] - dz;
  const bdz = b[2] - dz;
  const cdz = c[2] - dz;
  return (a[0] - dx) * (bdy * cdz - bdz * cdy) + (b[0] - dx) * (cdy * adz - cdz * ady) + (c[0] - dx) * (ady * bdz - adz * bdy);
};
export {
  signedVolume
};
