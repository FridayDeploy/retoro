export const Button = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`${className} py-4 px-5 bg-gray-600 rounded-lg text-left font-medium`}
    >
      {children}
    </button>
  );
};
