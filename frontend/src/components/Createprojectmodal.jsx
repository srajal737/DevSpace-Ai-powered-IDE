import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { createProject } from "../services/projectdetails";
import { useDispatch } from "react-redux";
import { addnewproject } from "../redux/projectslice";
import toast, {} from 'react-hot-toast'
const Createprojectmodal = ({ opencreatemodal, setcreatemodal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  if (!opencreatemodal) return null;

  const formsubmit = async (data) => {
  try {
    setloading(true);

    const res = await createProject({
      name: data.name,
      description: data.description,
    });

    if (res) {
      dispatch(addnewproject(res));
      toast.success("Project created successfully");
      setcreatemodal(false);
    } else {
      toast.error("Something went wrong while creating the project");
    }
  } catch (error) {
    toast.error("Failed to create project");
  } finally {
    setloading(false);
  }
};

  const inputStyles =
    "w-full rounded-xl border border-gray-300/80 bg-white/80 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 hover:border-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900/60 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/20";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Overlay */}
      <div
        onClick={() => setcreatemodal(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Background glow */}
      <div className="pointer-events-none absolute h-[350px] w-[350px] rounded-full bg-blue-500/20 blur-[100px]" />

     
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-2xl shadow-black/20 dark:border-gray-700 dark:bg-gray-900">
     
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Create Project
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Get your workspace ready.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setcreatemodal(false)}
            aria-label="Close modal"
            className="rounded-lg p-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <IoClose className="text-2xl" />
          </button>
        </div>

        <div className="h-px bg-gray-200 dark:bg-gray-800" />

        {/* Form */}
        <form onSubmit={handleSubmit(formsubmit)} noValidate>
          <div className="space-y-5 px-6 py-6">
            {/* Project name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Project Name <span className="text-red-500">*</span>
              </label>

              <input
                id="name"
                type="text"
                placeholder="e.g. My project"
                autoComplete="off"
                aria-invalid={!!errors.name}
                {...register("name", {
                  required: "Project name is required.",
                  minLength: {
                    value: 3,
                    message: "Project name must be at least 3 characters.",
                  },
                })}
                className={`${inputStyles} ${
                  errors.name
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : ""
                }`}
              />

              {errors.name && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Project Description
                <span className="ml-1 font-normal text-gray-400">
                  (Optional)
                </span>
              </label>

              <textarea
                id="description"
                rows={4}
                placeholder="Describe what you're building..."
                {...register("description", {
                  maxLength: {
                    value: 500,
                    message: "Description cannot exceed 500 characters.",
                  },
                })}
                className={`${inputStyles} resize-none ${
                  errors.description
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : ""
                }`}
              />

              {errors.description && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50/80 px-6 py-4 dark:border-gray-800 dark:bg-gray-950/40">
            <button
              type="button"
              disabled={loading}
              onClick={() => setcreatemodal(false)}
              className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:ring-offset-gray-900"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-blue-600/30 focus:outline-none focus:ring-4 focus:ring-blue-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Creating...
                </>
              ) : (
                "Create Project"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Createprojectmodal;