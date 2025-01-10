export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <h1 className="text-lg">Welcome to Example ecommerce app.</h1>
          <p>
            This is a simple example of an ecommerce app built with Next.js.
            <br />
            Build for learning purposes.
          </p>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <div>@{new Date().getFullYear()} Example.com</div>
      </footer>
    </div>
  );
}
