export default function HomePage() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold mb-4'>RONR</h1>
        <a
          href='/dashboard'
          className='inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90'
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}
