import AppNav from '@/components/home/appNav';
export default function AppTemplate({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header className='fixed-top'>
        <AppNav />
      </header>
      <main className='container-fluid mt-5 pt-1'>
        {children}
      </main>
    </>
  );
};