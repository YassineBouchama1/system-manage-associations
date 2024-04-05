"use client";

import { useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";

export function DeleteBtn({
  title = "delete",
  style,
  loadingForm = "loading...",
}: {
  title?: string;
  style?: string;
  loadingForm?: any;
}) {
  const { pending } = useFormStatus();
  //  const t = useTranslations("ui");
  return (
    <button type="submit" aria-disabled={pending} className={style}>
      {pending ? loadingForm : title }
    </button>
  );
}
