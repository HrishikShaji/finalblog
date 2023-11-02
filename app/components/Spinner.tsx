export const Spinner = () => {
  return (
    <svg
      className="animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      width="20px"
      height="20px"
      viewBox="0 0 14 14"
    >
      <g fill="none" fill-rule="evenodd">
        <circle
          cx="7"
          cy="7"
          r="6"
          stroke="#ffffff"
          stroke-opacity=".1"
          stroke-width="2"
        />

        <path
          fill="#ffffff"
          fill-opacity="1"
          fill-rule="nonzero"
          d="M7 0a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5V0z"
        />
      </g>
    </svg>
  );
};
