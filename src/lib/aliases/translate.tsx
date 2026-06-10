export function Translate({ children, id }: { children: React.ReactNode; id?: string }) {
  return <>{children}</>;
}

export function translate({ message }: { message: string; id?: string }): string {
  return message;
}

export default Translate;
