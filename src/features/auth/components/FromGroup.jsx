import React from "react";

const FromGroup = ({
  label,
  title,
  type = "text",
  placeholder = "",
  onChange,
  required = true,
}) => {
  return (
    <div className="flex flex-col items-start gap-1.5 w-full text-left font-sans">
      <label htmlFor={label} className="text-xs font-mono uppercase tracking-wider text-zinc-400">
        {title}
      </label>
      <input
        id={label}
        type={type}
        placeholder={placeholder}
        required={required}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className="w-full bg-zinc-950 border border-zinc-800 focus:border-white focus:outline-none rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 transition-all font-sans"
      />
    </div>
  );
};

export default FromGroup;

