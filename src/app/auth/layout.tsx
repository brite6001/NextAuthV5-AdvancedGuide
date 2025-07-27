export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex items-center justify-center bg-gray-50 from-neutral-900 via-neutral-600 to-neutral-900">
      {children}
    </div>
  );
}
