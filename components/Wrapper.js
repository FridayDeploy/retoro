export const Wrapper = ({ children, className }) => {
  return (
    <main className={`${className} mx-auto max-w-960 grid grid-cols-8 gap-x-4`}>
      {children}
    </main>
  );
};
