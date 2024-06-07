export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="relative flex min-h-dvh flex-col">{children}</div>;
}
