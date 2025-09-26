import Plans from "./components/Plans";

const PLANS = [
  {
    id: "1",
    title: "Free",
    description: "The basics to level up your hacking skills",
    priceInUSDPerMonthOrText: 0,
    action: {
      label: "Create Free Account",
      href: "/auth/register",
    },
    features: [
      {
        title: "Play desert battles one time per month",
        included: true,
      },
      {
        title: "Access the writeups",
        included: false,
      },
      {
        title: "Desert battles customization",
        included: false,
      },
    ],
    promote: false,
  },
  {
    id: "2",
    title: "Hacker",
    description: "All our best features and services",
    priceInUSDPerMonthOrText: 39,
    action: {
      label: "Get Started",
      href: "/auth/register",
    },
    features: [
      {
        title: "Play desert battles three times per month",
        included: true,
      },
      {
        title: "Access the writeups",
        included: true,
      },
      {
        title: "Desert battles customization",
        included: false,
      },
    ],
    promote: false,
  },
  {
    id: "3",
    title: "Super Hacker",
    description: "An evolution of the VIP offering",
    priceInUSDPerMonthOrText: 99,
    action: {
      label: "Get Started",
      href: "/auth/register",
    },
    features: [
      {
        title: "Play desert battles three times per month",
        included: true,
      },
      {
        title: "Access the writeups",
        included: true,
      },
      {
        title: "Desert battles customization",
        included: true,
      },
    ],
    promote: true,
  },
  {
    id: "4",
    title: "Team Plan",
    description: "Train your team with HTB, access execlusive features",
    priceInUSDPerMonthOrText: "Lets Chat!",
    action: {
      label: "Create Free Account",
      href: "/auth/register",
    },
    features: [
      {
        title: "Play desert battles three times per month",
        included: true,
      },
      {
        title: "Access the writeups",
        included: true,
      },
      {
        title: "Desert battles customization",
        included: true,
      },
    ],
    promote: false,
  },
];

export default function Pricing() {
  return (
    <section className="container py-8">
      <h2 className="pb-4 text-center shadow-primary text-shadow">Subscriptions</h2>
      <p className="mx-auto max-w-[90ch] text-center text-foreground-alt">
        Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint
        ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur
        officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate
        dolor minim nulla est proident.
      </p>
      <Plans plans={PLANS} />
    </section>
  );
}
