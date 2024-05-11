"use client";
import styles from "$$/page/gb.module.css";

import { saveGuestbookEntry } from "@/db/actions";
import { useRef } from "react";
import { useFormStatus } from "react-dom";

export default function Form() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      className={styles.form}
      ref={formRef}
      action={async (formData) => {
        await saveGuestbookEntry(formData);
        formRef.current?.reset();
      }}
    >
      <input
        aria-label="Your message"
        placeholder="Your message..."
        name="entry"
        type="text"
        required
        className={styles.input}
      />
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className={styles.submit} disabled={pending} type="submit">
      Sign
    </button>
  );
}
