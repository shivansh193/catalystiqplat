import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import styles from "./darkmode.module.css";

export const ModeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div className={styles.iconContainer}>
      <Switch
        checked={theme === "dark"}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      {theme === "dark" ? (
        <Moon className="text-gray-600" size={16} />
      ) : (
        <Sun className="text-yellow-900" size={16} />
      )}
    </div>
  );
};