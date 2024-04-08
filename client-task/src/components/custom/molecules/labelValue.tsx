import { RxValueNone } from "react-icons/rx";

interface LabelValueProps {
  label: string;
  value?: string;
}

const LabelValue: React.FC<LabelValueProps> = ({ label, value }) => {
  const textOrIcon: string | JSX.Element = value ?? <RxValueNone size={20} />;

  return (
    <article>
      <div className="text-sm text-slate-500">{label}</div>

      <div className="text-base">{textOrIcon}</div>
    </article>
  );
};

export default LabelValue;
