import clsx from "clsx";

interface IHeaderProps {}

function Header(props: IHeaderProps) {
  return (
    <header
      className={clsx(
        "border-b border-b-primary bg-card",
        "sticky inset-x-0 top-0 z-30",
        "after:absolute after:inset-x-0 after:bottom-0 after:h-4 after:w-full after:translate-y-full after:bg-gradient-to-b after:from-primary/40 after:to-transparent",
      )}
      {...props}
    >
      <div className={clsx("container py-4")}>Secure Desert</div>
    </header>
  );
}

export default Header;
