import QuestionTooltip from "../QuestionTooltip";

export default function SettingsCheckbox({
  label,
  name,
  disabled = false,
  tooltip = false,
  tooltipText = "",
}: {
  label: string;
  name: string;
  disabled?: boolean;
  tooltip?: boolean;
  tooltipText?: string;
}) {
  return (
    <label className="flex px-[0.25rem] py-[0.5rem] gap-4 cursor-pointer">
      <span className="label-text">
        {label}
        {tooltip && <QuestionTooltip tip={tooltipText} />}
      </span>
      <input
        name={name}
        disabled={disabled}
        type="checkbox"
        className="checkbox checkbox-primary"
      />
    </label>
  );
}
