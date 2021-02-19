export const Card = ({ children, className }) => {
  return (
    <div className={`${className} bg-gray-800 p-10 rounded-2xl text-gray-50`}>
      {children}
    </div>
  );
};
