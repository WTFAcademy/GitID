/** @type {import('next').NextConfig} */

const nextConfig = {
    webpack: config => {
        config.externals.push('pino-pretty', 'lokijs', 'encoding')
        return config
    },
    images: {
        domains: ['avatars.githubusercontent.com']
    }
}

export default nextConfig;
