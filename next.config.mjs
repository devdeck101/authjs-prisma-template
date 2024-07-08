/** @type {import('next').NextConfig} */
const nextConfig = {};
import nextra from 'nextra'
const withNextra = nextra({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.tsx'
  })
   
  export default withNextra(nextConfig)


// export default nextConfig;
