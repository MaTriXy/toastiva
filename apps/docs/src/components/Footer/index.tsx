export const Footer = () => {
  return (
    <footer className="relative z-10 w-full border-t border-white/5 bg-transparent mt-auto">
      <div className="max-w-4xl mx-auto px-6 py-8 flex items-center flex-col">
        <p className="flex items-center gap-3 m-0 text-sm text-neutral-500">
          <span>
            Made by{" "}
            <a
              href="https://github.com/rit3zh"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-neutral-300 hover:text-white transition-colors no-underline hover:underline"
            >
              rit3zh
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
};
