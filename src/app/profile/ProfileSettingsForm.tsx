"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Check, Loader2 } from "lucide-react";

export default function ProfileSettingsForm({ initialName }: { initialName: string }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [savingName, setSavingName] = useState(false);
  const [nameSaved, setNameSaved] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const saveName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSavingName(true);
    setNameError(null);
    setNameSaved(false);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not signed in");

      // RLS already scopes this to the caller's own row (auth.uid() = id),
      // so a plain client-side update is safe — no API route needed.
      const { error } = await supabase.from("profiles").update({ full_name: name.trim() }).eq("id", user.id);
      if (error) throw new Error(error.message);

      setNameSaved(true);
      router.refresh();
    } catch (err) {
      setNameError(err instanceof Error ? err.message : "Couldn't save your name");
    } finally {
      setSavingName(false);
    }
  };

  const savePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSaved(false);

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords don't match.");
      return;
    }

    setSavingPassword(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw new Error(error.message);

      setPasswordSaved(true);
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : "Couldn't update your password");
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div id="settings" className="bg-white rounded-2xl border border-site-border p-6 space-y-8 scroll-mt-6">
      <h2 className="text-lg font-bold text-site-text">Account settings</h2>

      {/* Name */}
      <form onSubmit={saveName}>
        <label className="block text-sm font-semibold text-site-text mb-1.5">Display name</label>
        <div className="flex items-center gap-2 max-w-sm">
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameSaved(false);
            }}
            className="flex-1 px-3 py-2.5 rounded-xl border border-site-border text-sm focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10"
          />
          <button
            type="submit"
            disabled={savingName || !name.trim() || name === initialName}
            className="shrink-0 bg-site-primary text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-site-primary/95 disabled:opacity-40 transition-colors"
          >
            {savingName ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
          </button>
        </div>
        {nameSaved && (
          <p className="text-xs text-site-success flex items-center gap-1 mt-1.5">
            <Check className="w-3 h-3" /> Saved
          </p>
        )}
        {nameError && <p className="text-xs text-red-500 mt-1.5">{nameError}</p>}
      </form>

      <div className="border-t border-site-border" />

      {/* Password */}
      <form onSubmit={savePassword} className="max-w-sm">
        <label className="block text-sm font-semibold text-site-text mb-1.5">Change password</label>
        <div className="space-y-2">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setPasswordSaved(false);
            }}
            placeholder="New password"
            className="w-full px-3 py-2.5 rounded-xl border border-site-border text-sm focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setPasswordSaved(false);
            }}
            placeholder="Confirm new password"
            className="w-full px-3 py-2.5 rounded-xl border border-site-border text-sm focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10"
          />
        </div>
        <button
          type="submit"
          disabled={savingPassword || !newPassword || !confirmPassword}
          className="mt-3 bg-site-primary text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-site-primary/95 disabled:opacity-40 transition-colors"
        >
          {savingPassword ? "Updating..." : "Update password"}
        </button>
        {passwordSaved && (
          <p className="text-xs text-site-success flex items-center gap-1 mt-1.5">
            <Check className="w-3 h-3" /> Password updated
          </p>
        )}
        {passwordError && <p className="text-xs text-red-500 mt-1.5">{passwordError}</p>}
      </form>
    </div>
  );
}