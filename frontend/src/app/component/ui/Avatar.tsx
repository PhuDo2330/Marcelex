"use client";

type AvatarProps = { name?: string; size?: number };

function Avatar({ name = "User", size = 32 }: AvatarProps) {
  const initials = (name || "")
    .split(" ")
    .filter(Boolean)
    .map(s => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="inline-flex items-center justify-center rounded-full bg-orange-500 text-white font-semibold"
      style={{ width: size, height: size, fontSize: Math.max(10, size / 2.6) }}
      title={name}
    >
      {initials}
    </div>
  );
}

export default Avatar








;
export { Avatar };
