export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className="min-h-screen flex-col  flex justify-center items-center">
        {children}
      </div>
    </main>
  );
}
