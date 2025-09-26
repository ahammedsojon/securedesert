import Plan, { IPlan } from "./Plan";

interface IPlans {
  plans: IPlan[];
}

interface IPlansProps extends IPlans {}

export default function Plans({ plans }: IPlansProps) {
  return (
    <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {plans.map((plan) => (
        <Plan key={plan.id} {...plan} />
      ))}
    </ul>
  );
}
