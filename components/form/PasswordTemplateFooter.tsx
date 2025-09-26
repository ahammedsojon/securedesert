import { Divider } from "primereact/divider";

export default function PasswordTemplateFooter() {
  return (
    <>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="ml-2 mt-0 pl-2 leading-6">
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </>
  );
}
