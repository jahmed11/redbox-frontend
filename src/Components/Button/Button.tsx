import { ReactNode } from "react";
import { Button, ButtonProps } from "antd";

interface CustomButtonProps extends ButtonProps {
  children?: ReactNode;
}

const AppButton = ({ children, ...props }: CustomButtonProps) => {
  return <Button {...props}>{children}</Button>;
};

export default AppButton;
