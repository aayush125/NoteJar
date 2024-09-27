import SettingsInput from "./note/SettingsInput";

export default function PasswordCard({
  noteId,
  buttonText,
}: {
  noteId: string;
  buttonText: string;
}) {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">This note is password protected</h2>
        <p>Enter password to access</p>
        <SettingsInput
          label=""
          name="password"
          placeholder="Password"
          isPassword
          required
        />
        <div className="card-actions justify-end">
          <button type="submit" className="btn btn-primary">
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
