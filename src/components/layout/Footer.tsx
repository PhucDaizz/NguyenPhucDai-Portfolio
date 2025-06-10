
export default function Footer() {
  return (
    <footer className="border-t border-border/40 py-6 md:py-8">
      <div className="container mx-auto max-w-5xl flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-center px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Nguyễn Phúc Đại. All rights reserved.
        </p>
        {/* Optional: Add social links or other footer content here */}
      </div>
    </footer>
  );
}
