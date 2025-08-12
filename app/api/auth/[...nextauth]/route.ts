import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (credentials?.email === 'raobadalyadav11@gmail.com' && 
            credentials?.password === 'admin123') {
          return {
            id: '1',
            name: 'Badal Kumar',
            email: 'raobadalyadav11@gmail.com',
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      return session;
    },
  },
  pages: {
    signIn: '/admin/signin',
  },
});

export { handler as GET, handler as POST };