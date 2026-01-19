export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`px-5 py-2.5 rounded-lg font-semibold bg-[#20427f] text-white 
        hover:bg-[#1a3668] shadow-md hover:shadow-lg transition ${className}`}
    >
      {children}
    </button>
  )
}
