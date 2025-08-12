import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect admin routes
        if (req.nextUrl.pathname.startsWith('/admin') && !req.nextUrl.pathname.includes('/signin')) {
          return token?.email === 'raobadalyadav11@gmail.com';
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/admin/:path*'],
};