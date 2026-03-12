export default function Footer() {
  return (
    <footer className="border-t border-amber-100 bg-[#FDFAF4] mt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#D4380D] flex items-center justify-center">
            <span
              className="text-white text-xs font-bold"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              B
            </span>
          </div>
          <span
            className="text-sm font-semibold text-[#4A2C17]"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            BundeliServe
          </span>
        </div>

        <p className="text-xs text-[#8C6F5A] text-center">
          © {new Date().getFullYear()} BundeliServe. All rights reserved.
        </p>

        <p className="text-xs text-[#C4A882]">Made with ❤️ in India</p>
      </div>
    </footer>
  );
}
