/** @type {import('next').NextConfig} */
import nextra from 'nextra'
const nextConfig = {};
const withNextra = nextra({
    theme: 'nextra-theme-docs',
    // theme: './theme.tsx',
    themeConfig: './theme.config.tsx'
  })
   
  export default withNextra(nextConfig)


// export default nextConfig;
