/** @type {import('next').NextConfig} */
const nextConfig = {
images:{
		remotePatterns:[
{
protocol:"https",
hostname:"utfs.io"
},
{
protocol:"https",
hostname:"images.pexels.com"
},
{
protocol:"https",
hostname:"firebasestorage.googleapis.com"
},
{
protocol:"https",
hostname:"lh3.googleusercontent.com"
},]

	}
}

module.exports = nextConfig
