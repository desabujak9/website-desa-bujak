import { Button } from "@heroui/react";
import DisplayLogo from "../molecules/DisplayLogo";
import NavigationBarMenu from "../molecules/NavigationBarMenu";

export default function NavigationBar() {
  return (
    <div className="py-[12px] px-[48px] border flex justify-between">
      <DisplayLogo />
      <NavigationBarMenu />
    </div>
  );
}
