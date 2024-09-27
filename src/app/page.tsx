import { postNote } from "./actions";
import SettingsInput from "@/components/note/SettingsInput";
import SettingsCheckbox from "@/components/note/SettingsCheckbox";

export default function Home() {
  return (
    <>
      <form action={postNote}>
        <div className="flex flex-col sm:flex-row">
          <div className="mt-4 mx-8 flex flex-col gap-5 sm:w-3/4">
            <input
              type="text"
              name="title"
              placeholder="New note..."
              className="input input-bordered input-primary w-full max-w-3xl"
            />
            <textarea
              required
              name="note"
              placeholder="Text..."
              className="textarea textarea-bordered textarea-lg w-full max-w-full h-80 md:max-w-3xl resize-none"
            ></textarea>
          </div>
          <div className="mt-4 mx-8 border-double border-4 rounded border-neutral-300 flex flex-col px-4 pt-4 sm:w-2/4">
            <h3 className="mb-2 mt-0 text-2xl font-semibold leading-tight text-primary">
              Note settings
            </h3>
            <SettingsInput
              label="Set a password?"
              name="password"
              placeholder="Password"
              isPassword
            />
            <SettingsInput
              label="Paste as..."
              name="nickname"
              placeholder="Nickname"
            />
            <SettingsCheckbox
              label="Keep longer"
              name="keep"
              disabled
              tooltip
              tooltipText="By default, notes are only kept for 30 days."
            />
            <SettingsCheckbox
              label="Allow delete"
              name="allow_delete"
              tooltip
              tooltipText="Choose whether to allow anyone with the link to delete this note."
            />
            <button
              type="submit"
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
            >
              Create note
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
