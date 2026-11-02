import React from "react";
import { motion } from "motion/react";

import {
  FiArrowRight,
  FiArrowUpRight,
  FiCheck,
  FiMenu,
  FiMoon,
  FiSun,
  FiX,
  FiGithub,
  FiPlay,
  FiCloud,
  FiDatabase,
  FiCode,
  FiCommand,
} from "react-icons/fi";

import {
  HiOutlineSparkles,
  HiOutlineCodeBracket,
  HiOutlineFolder,
  HiOutlineCommandLine,
  HiOutlineShieldCheck,
  HiOutlineBolt,
  HiOutlineCpuChip,
  HiOutlineRocketLaunch,
  HiOutlineGlobeAlt,
  HiOutlineCloud,
  HiOutlineCircleStack,
  HiOutlineArrowPath,
  HiOutlineDevicePhoneMobile,
  HiOutlineServerStack,
} from "react-icons/hi2";

import {
  BsStars,
  BsWindowSidebar,
  BsChatSquareText,
  BsLayers,
  BsCloudCheck,
} from "react-icons/bs";

import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: HiOutlineSparkles,
    title: "AI-powered coding",
    description:
      "Turn natural language instructions into real code. Let AI understand your project, create files, fix bugs, and help you build faster.",
    tag: "AI DEVELOPMENT",
  },
  {
    icon: HiOutlineCloud,
    title: "Cloud-based workspace",
    description:
      "Your projects live in the cloud. Save your work and access your development environment whenever and wherever you need it.",
    tag: "CLOUD WORKSPACE",
  },
  {
    icon: HiOutlineCircleStack,
    title: "Persistent project storage",
    description:
      "Keep your project files and workspace data stored persistently instead of depending only on your local machine.",
    tag: "CLOUD STORAGE",
  },
  {
    icon: HiOutlineCommandLine,
    title: "Integrated terminal",
    description:
      "Run commands, install packages, and execute your applications inside your development workspace.",
    tag: "TERMINAL",
  },
  {
    icon: HiOutlineFolder,
    title: "Intelligent file management",
    description:
      "Create, organize, update, and manage project files through a familiar file explorer and AI-assisted workflow.",
    tag: "FILE MANAGEMENT",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Your workspace, your control",
    description:
      "Keep your development workflow organized with persistent project data and controlled AI-assisted changes.",
    tag: "DEVELOPER CONTROL",
  },
];

const steps = [
  {
    number: "01",
    icon: BsStars,
    title: "Create your workspace",
    description:
      "Start a new project or open an existing one. Your workspace becomes the central place for your development.",
  },
  {
    number: "02",
    icon: HiOutlineSparkles,
    title: "Build with AI",
    description:
      "Describe what you want to build. Your AI assistant can understand project files and help implement your ideas.",
  },
  {
    number: "03",
    icon: HiOutlineCloud,
    title: "Save in the cloud",
    description:
      "Keep your projects and workspace data persistent, so you can return to your work without starting over.",
  },
];

const codeLines = [
  {
    n: 1,
    content: (
      <>
        <span className="text-purple-400">import</span> React{" "}
        <span className="text-purple-400">from</span>{" "}
        <span className="text-emerald-300">'react'</span>;
      </>
    ),
  },
  { n: 2, content: <></> },
  {
    n: 3,
    content: (
      <>
        <span className="text-purple-400">const</span>{" "}
        <span className="text-yellow-300">DevSpace</span> = (){" "}
        <span className="text-purple-400">=&gt;</span> {"{"}
      </>
    ),
  },
  {
    n: 4,
    content: (
      <>
        {"  "}
        <span className="text-purple-400">return</span> (
      </>
    ),
  },
  {
    n: 5,
    content: (
      <>
        {"    "}
        <span className="text-slate-400">&lt;</span>
        <span className="text-red-300">Workspace</span>
        <span className="text-slate-400">&gt;</span>
      </>
    ),
  },
  {
    n: 6,
    content: (
      <>
        {"      "}
        <span className="text-slate-400">&lt;</span>
        <span className="text-red-300">AI</span>{" "}
        <span className="text-orange-300">enabled</span>
        ={'{true}'} <span className="text-slate-400">/&gt;</span>
      </>
    ),
  },
  {
    n: 7,
    content: (
      <>
        {"      "}
        <span className="text-slate-400">&lt;</span>
        <span className="text-red-300">CloudStorage</span>{" "}
        <span className="text-orange-300">persistent</span>
        ={'{true}'} <span className="text-slate-400">/&gt;</span>
      </>
    ),
  },
  {
    n: 8,
    content: (
      <>
        {"      "}
        <span className="text-slate-400">&lt;</span>
        <span className="text-red-300">Terminal</span>{" "}
        <span className="text-orange-300">integrated</span>
        ={'{true}'} <span className="text-slate-400">/&gt;</span>
      </>
    ),
  },
  {
    n: 9,
    content: (
      <>
        {"    "}
        <span className="text-slate-400">&lt;/</span>
        <span className="text-red-300">Workspace</span>
        <span className="text-slate-400">&gt;</span>
      </>
    ),
  },
  { n: 10, content: <>{"  "});</> },
  { n: 11, content: <>{'};'}</> },
];

const reveal = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

function SectionHeading({ eyebrow, title, description }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="mx-auto mb-14 max-w-2xl text-center"
    >
      <motion.div
        variants={reveal}
        className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold tracking-widest border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300"
      >
        <HiOutlineSparkles size={15} />
        {eyebrow}
      </motion.div>

      <motion.h2
        variants={reveal}
        className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-slate-950 dark:text-white"
      >
        {title}
      </motion.h2>

      <motion.p
        variants={reveal}
        className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-400"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}

function IDEPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 55, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="relative mx-auto mt-16 w-full max-w-6xl overflow-hidden rounded-2xl border shadow-2xl border-slate-200 bg-white shadow-slate-300/40 dark:border-white/10 dark:bg-[#10111b] dark:shadow-violet-950/30"
    >
      {/* IDE top bar */}
      <div className="flex h-12 items-center justify-between border-b px-4 border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-[#151622]">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
          <span className="ml-4 text-xs font-medium text-slate-500 dark:text-slate-400">
            DevSpace — Cloud IDE
          </span>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-medium text-emerald-400 sm:flex">
          <BsCloudCheck size={13} />
          Cloud workspace saved
        </div>

        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Online
          </span>
        </div>
      </div>

      <div className="grid min-h-[390px] grid-cols-1 md:grid-cols-[180px_1fr_240px]">
        {/* File explorer */}
        <div className="hidden border-r p-4 md:block border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-[#12131e]">
          <div className="mb-5 flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500">
            <HiOutlineFolder size={14} />
            EXPLORER
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200">
              <HiOutlineFolder className="text-violet-400" />
              my-project
            </div>

            <div className="ml-4 space-y-3 border-l pl-3 border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <HiOutlineFolder className="text-yellow-400" /> src
              </div>

              <div className="ml-3 flex items-center gap-2 text-sky-400">
                <HiOutlineCodeBracket />
                App.jsx
              </div>

              <div className="ml-3 flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <HiOutlineCodeBracket /> index.css
              </div>

              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <HiOutlineFolder className="text-yellow-400" /> public
              </div>

              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <HiOutlineCodeBracket className="text-emerald-400" /> package.json
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-lg border p-3 border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.03]">
            <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold text-violet-400">
              <FiCloud />
              CLOUD STORAGE
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">
              Workspace synced
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
              <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
            </div>
            <div className="mt-2 text-[9px] text-slate-400 dark:text-slate-500">
              Project storage preview
            </div>
          </div>
        </div>

        {/* Code editor */}
        <div className="min-w-0 bg-white dark:bg-[#10111b]">
          <div className="flex h-10 items-center justify-between border-b px-4 border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-[#151622]">
            <div className="flex items-center gap-2 text-xs">
              <HiOutlineCodeBracket className="text-sky-400" />
              <span className="text-slate-700 dark:text-slate-200">App.jsx</span>
              <span className="text-violet-400">●</span>
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">
              JavaScript JSX
            </span>
          </div>

          <div className="overflow-x-auto px-3 py-5 font-mono text-[11px] leading-7 sm:px-5 sm:text-xs">
            {codeLines.map((line) => (
              <div key={line.n} className="flex min-w-max">
                <span className="mr-5 inline-block w-5 select-none text-right text-slate-600">
                  {line.n}
                </span>
                <span className="text-slate-700 dark:text-slate-300">
                  {line.content}
                </span>
              </div>
            ))}
          </div>
                    {/* Terminal */}
          <div className="mx-4 mb-4 rounded-lg border p-3 border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold text-emerald-500">
              <HiOutlineCommandLine size={14} />
              TERMINAL
            </div>
            <div className="font-mono text-[10px] text-slate-600 dark:text-slate-400 sm:text-xs">
              <p>
                <span className="text-emerald-400">➜</span> npm run dev
              </p>
              <p className="mt-1 text-emerald-400">
                ✓ Development server running
              </p>
            </div>
          </div>
        </div>

        {/* AI assistant */}
        <div className="hidden border-l p-4 md:block border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-[#12131e]">
          <div className="mb-5 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 text-white">
              <BsStars size={14} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-white">
                DevSpace AI
              </p>
              <p className="text-[9px] text-emerald-400">Ready to help</p>
            </div>
          </div>

          <div className="rounded-xl border p-3 text-[10px] leading-5 border-slate-200 bg-white text-slate-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300">
            How can I help you with your project today?
          </div>

          <div className="mt-4 space-y-2">
            <div className="rounded-lg border p-2 text-[10px] border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300">
              Create a login page
            </div>
            <div className="rounded-lg border p-2 text-[10px] border-slate-200 bg-white text-slate-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400">
              Fix my code
            </div>
            <div className="rounded-lg border p-2 text-[10px] border-slate-200 bg-white text-slate-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400">
              Explain this project
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2 rounded-lg border p-2 border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.03]">
            <span className="flex-1 text-[9px] text-slate-400 dark:text-slate-500">
              Ask anything...
            </span>
            <div className="rounded-md bg-violet-500 p-1.5 text-white">
              <FiArrowRight size={12} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-950 transition-colors duration-300 dark:bg-[#080912] dark:text-white">
      <Navbar />

      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute -top-64 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-300/35 blur-[150px] dark:bg-violet-700/20" />
        <div className="absolute top-[700px] -left-48 h-[450px] w-[450px] rounded-full bg-cyan-300/25 blur-[140px] dark:bg-cyan-600/10" />
        <div className="absolute top-[1500px] -right-48 h-[450px] w-[450px] rounded-full bg-purple-300/25 blur-[140px] dark:bg-purple-600/10" />
      </div>

      {/* Hero */}
      <section className="relative z-10 px-5 pb-20 pt-24 sm:px-8 sm:pt-32 lg:pb-28 lg:pt-36">
        <div className="mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/[0.08] dark:text-violet-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Meet your new cloud development workspace
            <FiArrowUpRight />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mx-auto max-w-5xl text-5xl font-bold leading-[1.08] tracking-[-0.055em] text-slate-950 dark:text-white sm:text-6xl lg:text-8xl"
          >
            Your ideas deserve
            <br />
            more than just
            <span className="relative ml-3 inline-block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              an editor.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mx-auto mt-8 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg"
          >
            Meet DevSpace — an AI-powered cloud IDE where your projects,
            code, and development environment come together.
            Build smarter, save in the cloud, and create from anywhere.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <button onClick={()=>navigate('/login')} className="group flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-violet-600/25 transition hover:-translate-y-1 hover:shadow-violet-600/40 sm:w-auto">
              Start building for free
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href="#workspace"
              className="flex w-full items-center justify-center gap-3 rounded-full border px-8 py-4 text-sm font-semibold transition border-slate-300 text-slate-800 hover:bg-slate-100 dark:border-white/15 dark:text-white dark:hover:bg-white/5 sm:w-auto"
            >
              <FiPlay size={15} />
              Explore workspace
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-slate-600 dark:text-slate-400"
          >
            <span className="flex items-center gap-2">
              <FiCheck className="text-emerald-400" /> Cloud-based projects
            </span>
            <span className="flex items-center gap-2">
              <FiCheck className="text-emerald-400" /> AI-assisted development
            </span>
            <span className="flex items-center gap-2">
              <FiCheck className="text-emerald-400" /> Access from anywhere
            </span>
          </motion.div>

          <IDEPreview />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-3"
          >
            {[
              [FiCloud, "Cloud workspace"],
              [FiDatabase, "Persistent storage"],
              [HiOutlineSparkles, "AI assistant"],
              [FiCode, "Code editor"],
            ].map(([Icon, label]) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full border px-4 py-2 text-xs border-slate-200 bg-white text-slate-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400"
              >
                <Icon className="text-violet-400" size={15} />
                {label}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Cloud advantage strip */}
      <section className="relative z-10 border-y py-14 border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.02]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 sm:grid-cols-3 sm:px-8">
          {[
            {
              icon: HiOutlineCloud,
              title: "Your work lives in the cloud",
              text: "Keep project data persistent and accessible.",
            },
            {
              icon: HiOutlineGlobeAlt,
              title: "Develop from anywhere",
              text: "Your workspace is not tied to one computer.",
            },
            {
              icon: HiOutlineArrowPath,
              title: "Return where you left off",
              text: "Continue working with your saved projects.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              className="flex items-start gap-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-400">
                <item.icon size={22} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-950 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>      {/* Features */}
      <section
        id="features"
        className="relative z-10 px-5 py-24 sm:px-8 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="BUILT FOR DEVELOPERS"
            title={
              <>
                Everything you need to{" "}
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  build better.
                </span>
              </>
            }
            description="A complete development environment that brings AI assistance, cloud storage, project management, and coding tools into one connected workspace."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: (index % 3) * 0.1,
                }}
                whileHover={{ y: -7 }}
                className="group relative overflow-hidden rounded-2xl border p-7 transition-colors duration-300 border-slate-200 bg-white hover:border-violet-300 hover:shadow-xl hover:shadow-violet-100 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-violet-400/30 dark:hover:bg-white/[0.06]"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl transition-opacity group-hover:opacity-100" />

                <div className="relative">
                  <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-400 transition group-hover:scale-110">
                    <feature.icon size={23} />
                  </div>

                  <span className="text-[10px] font-bold tracking-[0.2em] text-violet-400">
                    {feature.tag}
                  </span>

                  <h3 className="mt-3 text-xl font-bold text-slate-950 dark:text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>

                  <div className="mt-7 flex items-center gap-2 text-xs font-semibold text-violet-400 opacity-0 transition group-hover:opacity-100">
                    Explore feature <FiArrowRight />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cloud workspace showcase */}
      <section
        id="workspace"
        className="relative z-10 bg-slate-50 px-5 py-24 dark:bg-[#0c0d18] sm:px-8 lg:py-32"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold tracking-widest border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300">
              <FiCloud size={14} />
              YOUR CLOUD WORKSPACE
            </div>

            <h2 className="text-4xl font-bold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              Your projects.
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Always within reach.
              </span>
            </h2>

            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-400">
              Your development environment should move with you.
              DevSpace brings your project workspace into the cloud,
              helping you keep your files and project data persistent
              instead of being limited to a single device.
            </p>

            <div className="mt-9 space-y-5">
              {[
                [
                  "Cloud-stored projects",
                  "Keep your project data in persistent storage.",
                ],
                [
                  "Flexible access",
                  "Open your development workspace from supported devices.",
                ],
                [
                  "Connected development",
                  "Bring your editor, AI assistant, and terminal together.",
                ],
              ].map(([title, description]) => (
                <div key={title} className="flex gap-4">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                    <FiCheck size={14} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-950 dark:text-white">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#how-it-works"
              className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-violet-400 transition hover:gap-4"
            >
              Discover how it works <FiArrowRight />
            </a>
          </motion.div>

          {/* Cloud visual */}
          <motion.div
            initial={{ opacity: 0, x: 35, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto w-full max-w-lg"
          >
            <div className="absolute inset-10 rounded-full bg-violet-500/20 blur-[90px]" />

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative rounded-3xl border p-6 shadow-2xl border-slate-200 bg-white dark:border-white/10 dark:bg-[#111321]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    YOUR WORKSPACE
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-slate-950 dark:text-white">
                    My Projects
                  </h3>
                </div>
                <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
                  <BsCloudCheck size={22} />
                </div>
              </div>

              <div className="mt-7 rounded-2xl border p-4 border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.025]">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white">
                    <HiOutlineCodeBracket size={21} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-950 dark:text-white">
                      AI Dashboard
                    </h4>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                      React · JavaScript
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
                    Saved
                  </span>
                </div>

                <div className="mt-4 h-px bg-slate-200 dark:bg-white/10" />

                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400">
                    Project files
                  </span>
                  <span className="text-slate-950 dark:text-white">
                    24 files
                  </span>
                </div>
              </div>

              <div className="mt-3 rounded-2xl border p-4 border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.025]">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                    <HiOutlineServerStack size={21} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-950 dark:text-white">
                      Backend API
                    </h4>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                      Node.js · Express
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
                    Saved
                  </span>
                </div>

                <div className="mt-4 h-px bg-slate-200 dark:bg-white/10" />

                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400">
                    Project files
                  </span>
                  <span className="text-slate-950 dark:text-white">
                    18 files
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-xl border p-4 border-violet-200 bg-violet-50 dark:border-violet-400/20 dark:bg-violet-400/[0.07]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-400">
                  <FiDatabase size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-950 dark:text-white">
                    Persistent cloud data
                  </p>
                  <p className="mt-1 text-[10px] text-slate-600 dark:text-slate-400">
                    Your workspace is ready when you are.
                  </p>
                </div>
                <FiCheck className="text-emerald-400" />
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-3 top-16 hidden items-center gap-3 rounded-xl border p-3 shadow-xl border-slate-200 bg-white dark:border-white/10 dark:bg-[#191a2a] sm:flex"
            >
              <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
                <FiCloud size={17} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-950 dark:text-white">
                  Cloud synced
                </p>
                <p className="text-[10px] text-slate-600 dark:text-slate-400">
                  Workspace available
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>      {/* How it works */}
      <section
        id="how-it-works"
        className="relative z-10 px-5 py-24 sm:px-8 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="A BETTER WAY TO DEVELOP"
            title="From idea to application."
            description="A connected workflow that helps you go from your first idea to a working project, with AI and cloud capabilities built in."
          />

          <div className="relative grid gap-6 md:grid-cols-3">
            <div className="absolute left-[16%] right-[16%] top-12 hidden h-px border-t border-dashed border-violet-300 dark:border-violet-400/30 md:block" />

            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative rounded-2xl border p-7 border-slate-200 bg-white hover:border-violet-300 hover:shadow-xl hover:shadow-violet-100 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-violet-400/30 dark:hover:bg-white/[0.06]"
              >
                <div className="relative z-10 mb-8 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400">
                    <step.icon size={25} />
                  </div>
                  <span className="text-4xl font-black text-slate-200 dark:text-white/10">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-950 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="relative z-10 overflow-hidden border-y border-slate-200 bg-slate-50 px-5 py-24 dark:border-white/10 dark:bg-[#0c0d18] sm:px-8 lg:py-28">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-500/10 blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-4xl text-center"
        >
          <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 text-white shadow-xl shadow-violet-500/20">
            <BsStars size={30} />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            Development should feel
            <span className="mt-2 block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              limitless.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400">
            No complicated setup. No disconnected tools.
            Just one workspace where your code, projects, cloud storage,
            and AI work together to help you bring ideas to life.
          </p>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 px-5 py-24 sm:px-8 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-violet-400/20 bg-gradient-to-br from-[#211348] via-[#17132d] to-[#0e2334] px-7 py-16 text-center shadow-2xl shadow-violet-950/20 sm:px-14 sm:py-20"
        >
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-500/25 blur-[90px]" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-[90px]" />

          <div className="relative">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-xs font-semibold text-violet-200">
              <BsStars /> YOUR NEXT DEVELOPMENT WORKSPACE
            </div>

            <h2 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
              Your next big idea starts in DevSpace.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Create your workspace, bring your ideas, and experience
              a smarter way to develop with AI and the cloud.
            </p>

            <button className="group mt-9 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold text-slate-950 shadow-xl transition hover:-translate-y-1 hover:bg-violet-100" onClick={()=>navigate('/login')}>
              Get started with DevSpace
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>

            <p className="mt-5 text-xs text-slate-400">
              Build. Save. Continue. Anywhere.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 bg-slate-50 px-5 py-10 dark:border-white/10 dark:bg-[#080912] sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-7 sm:flex-row">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 text-white">
              <BsStars size={18} />
            </div>
            <span className="text-lg font-bold text-slate-950 dark:text-white">
              DevSpace.
            </span>
          </a>

          <p className="text-center text-xs text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} DevSpace. Made By SS.
          </p>

          <div className="flex items-center gap-5">
            <a
              href="#features"
              className="text-xs text-slate-600 transition hover:text-violet-400 dark:text-slate-400"
            >
              Features
            </a>
            <a
              href="#workspace"
              className="text-xs text-slate-600 transition hover:text-violet-400 dark:text-slate-400"
            >
              Cloud IDE
            </a>
            <a
              href="#how-it-works"
              className="text-xs text-slate-600 transition hover:text-violet-400 dark:text-slate-400"
            >
              About
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}