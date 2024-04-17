import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", process.env.IMAGE_URL, "via.placeholder.com"],
  },
  // logging:{
  //     fetches:{
  //         fullUrl:true
  //     }
  // }
};

export default withNextIntl(nextConfig);
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   i18n: {
//     localeDetection: false, // 👈
//     locales: ["ar", "en"], // 👈
//     defaultLocale: "en", // 👈
//   },
// };

// export default nextConfig;
