import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

export type ButtonStyleProps = {
  variant?: "primary" | "quiet" | "light";
  size?: "sm" | "md" | "lg";
  icon?: IconName;
  iconAfter?: IconName;
  children: ReactNode;
  className?: string;
};

type AnchorProps = ButtonStyleProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children">;
type ButtonProps = ButtonStyleProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

function classes({ variant = "primary", size = "md", className }: Pick<ButtonStyleProps, "variant" | "size" | "className">) {
  return cn("btn", `btn-${variant}`, size === "lg" && "btn-lg", size === "sm" && "btn-sm", className);
}

/** One button component for links and actions, so every CTA looks and behaves the same. */
export function Button(props: AnchorProps | ButtonProps) {
  const { variant, size, icon, iconAfter, children, className, ...rest } = props;
  const inner = (
    <>
      {icon && <Icon name={icon} className="h-[1.15rem] w-[1.15rem]" />}
      <span>{children}</span>
      {iconAfter && <Icon name={iconAfter} className="h-[1.1rem] w-[1.1rem]" />}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, target, rel, ...anchor } = rest as AnchorProps;
    const external = /^https?:/.test(href);
    return (
      <a
        href={href}
        target={target ?? (external ? "_blank" : undefined)}
        rel={rel ?? (external ? "noopener noreferrer" : undefined)}
        className={classes({ variant, size, className })}
        {...anchor}
      >
        {inner}
      </a>
    );
  }

  const { type = "button", ...button } = rest as ButtonProps;
  return (
    <button type={type} className={classes({ variant, size, className })} {...button}>
      {inner}
    </button>
  );
}
