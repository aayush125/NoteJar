export default function QuestionTooltip({ tip }: { tip: string }) {
  return (
    <sup className="tooltip" data-tip={tip}>
      <svg width="15" height="15">
        <circle
          cx="5"
          cy="5"
          r="4"
          stroke="white"
          strokeWidth={1}
          fill="none"
        />
        <text x="3" y="8" fontSize="smaller" fill="white">
          ?
        </text>
      </svg>
    </sup>
  );
}
