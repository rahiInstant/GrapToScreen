import { createSignal, onCleanup, onMount } from "solid-js";
import { Portal } from "solid-js/web";

const options = [
  { value: "free", label: "Free Plan" },
  { value: "pro", label: "Pro Plan" },
  { value: "enterprise", label: "Enterprise" },
];

const Dropdown = () => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [selected, setSelected] = createSignal(options[0]);
  const [coords, setCoords] = createSignal({ top: 0, left: 0, width: 0 });
  let triggerRef: HTMLButtonElement | undefined;

  const toggleDropdown = () => {
    if (!triggerRef) return;

    const rect = triggerRef.getBoundingClientRect();
    setCoords({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
    });
    setIsOpen(!isOpen());
  };

  const handleSelect = (option: (typeof options)[0]) => {
    setSelected(option);
    setIsOpen(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    const dropdown = document.getElementById("portal-dropdown");
    if (
      dropdown &&
      !dropdown.contains(e.target as Node) &&
      !triggerRef?.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
  });

  onCleanup(() => {
    document.removeEventListener("click", handleClickOutside);
  });

  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        onClick={toggleDropdown}
        class="w-full bg-[#282a39] cursor-pointer text-white px-4 py-2 rounded-md border border-neutral-700 shadow-sm flex justify-between items-center hover:border-[#dad7d742] focus:outline-none focus:ring-2 focus:ring-[#dad7d742] transition"
      >
        {selected().label}
        <svg
          class={`w-4 h-4 transition-transform ${isOpen() ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen() && (
        <Portal>
          <ul
            id="portal-dropdown"
            class="absolute z-[9999] bg-neutral-800 border border-neutral-700 rounded-md shadow-lg divide-y divide-neutral-700"
            style={{
              top: `${coords().top}px`,
              left: `${coords().left}px`,
              width: `${coords().width}px`,
            }}
          >
            {options.map((option) => (
              <li>
                <button
                  class={`w-full text-left px-4 py-2 text-sm hover:bg-[#dad7d742] hover:text-white transition ${
                    selected().value === option.value
                      ? "bg-[#282a39] text-white"
                      : "text-gray-200"
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </Portal>
      )}
    </>
  );
};

export default Dropdown;
