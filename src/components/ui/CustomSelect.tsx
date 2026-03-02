"use client";

import { useState, useRef, useEffect } from "react";

export type CustomSelectOption = { value: string; label: string };

interface CustomSelectProps {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: CustomSelectOption[];
  placeholder?: string;
  className?: string;
  "aria-label"?: string;
}

const triggerClasses =
  "w-full rounded-xl border border-neutral-muted/30 bg-white px-4 py-3 text-left text-primary focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors flex items-center justify-between gap-2 min-h-[48px]";

export function CustomSelect({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = "Select...",
  className = "",
  "aria-label": ariaLabel,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedOption = options.find((o) => o.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;
  const itemCount = 1 + options.length; // placeholder + options

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setFocusedIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll focused option into view
  useEffect(() => {
    if (!open || focusedIndex < 0 || !listRef.current) return;
    const item = listRef.current.children[focusedIndex] as HTMLElement;
    item?.scrollIntoView({ block: "nearest" });
  }, [open, focusedIndex]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        setOpen(true);
        setFocusedIndex(value ? 1 + options.findIndex((o) => o.value === value) : 0);
      }
      return;
    }
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setOpen(false);
        setFocusedIndex(-1);
        break;
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((i) => (i < itemCount - 1 ? i + 1 : i));
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((i) => (i > 0 ? i - 1 : 0));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (focusedIndex === 0) {
          onChange("");
          setOpen(false);
          setFocusedIndex(-1);
        } else if (focusedIndex >= 1 && options[focusedIndex - 1]) {
          onChange(options[focusedIndex - 1].value);
          setOpen(false);
          setFocusedIndex(-1);
        }
        break;
      default:
        break;
    }
  }

  return (
    <div ref={containerRef} className={`relative ${open ? "z-[100]" : ""} ${className}`}>
      <input type="hidden" name={name} value={value} readOnly aria-hidden />
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel ?? (selectedOption ? selectedOption.label : placeholder)}
        aria-labelledby={undefined}
        className={`${triggerClasses} ${!selectedOption ? "text-neutral-muted" : ""}`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
      >
        <span className="truncate">{displayLabel}</span>
        <span
          className="shrink-0 text-primary/70 transition-transform duration-200"
          aria-hidden
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={open ? "rotate-180" : ""}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>
      {open && (
        <ul
          ref={listRef}
          role="listbox"
          aria-activedescendant={focusedIndex >= 0 ? `${id}-option-${focusedIndex}` : undefined}
          className="absolute z-50 mt-1 w-full rounded-xl border border-neutral-muted/30 bg-white py-1 shadow-lg shadow-primary/10 max-h-56 overflow-auto"
        >
          <li
            role="option"
            id={`${id}-option-0`}
            aria-selected={!value}
            className={`cursor-pointer px-4 py-2.5 text-sm transition-colors ${!value ? "bg-primary/10 text-primary font-medium" : "text-primary hover:bg-primary/5"}`}
            onClick={() => {
              onChange("");
              setOpen(false);
              setFocusedIndex(-1);
            }}
            onMouseEnter={() => setFocusedIndex(-1)}
          >
            {placeholder}
          </li>
          {options.map((opt, i) => (
            <li
              key={opt.value}
              role="option"
              id={`${id}-option-${i + 1}`}
              aria-selected={value === opt.value}
              className={`cursor-pointer px-4 py-2.5 text-sm transition-colors ${value === opt.value ? "bg-primary/10 text-primary font-medium" : "text-primary hover:bg-primary/5"}`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
                setFocusedIndex(-1);
              }}
              onMouseEnter={() => setFocusedIndex(i)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
