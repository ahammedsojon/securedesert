import { Button } from "primereact/button";

export default function Final() {
  return (
    <section className="border-t border-primary py-16 text-center text-primary shadow-sm">
      <div className="container flex flex-col items-center gap-8">
        <h3 className="max-w-[25ch] shadow-primary text-shadow-sm">
          Ready to take your cybersecurity skills to the next level?
        </h3>
        <p className="max-w-[95ch]">
          Sign up for a free trial of Secure Desert today and start learning from the best in the
          industry. With our comprehensive courses, challenging exercises, and real world battles,
          you&apos;ll be well on your way to becoming a cybersecurity expert.
        </p>
        <Button className="" size="large" label="Sign Up" />
      </div>
    </section>
  );
}
