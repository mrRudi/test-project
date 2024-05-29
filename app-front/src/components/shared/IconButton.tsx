import { Button, ButtonProps as UIButtonProps } from "@nextui-org/react";

interface ButtonProps extends UIButtonProps {}

export function IconButton({ children, ...props }: ButtonProps) {
  return (
    <Button
      isIconOnly
      radius="full"
      className="bg-yellow-400 text-white disabled:bg-gray-300 disabled:text-gray-100"
      {...props}
    >
      {children}
    </Button>
  );
}
