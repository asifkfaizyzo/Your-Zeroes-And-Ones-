export default function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2
        focus:ring-2 focus:ring-[#20427f]/50 focus:border-[#20427f] 
        placeholder:text-gray-500
        transition ${className}`}
    />
  )
}
