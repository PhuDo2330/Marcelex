"use client";
import { useEffect } from "react";
export function useAutoRefresh(cb: () => void, ms = 30000) {
    useEffect(() => { cb(); const id = setInterval(cb, ms); return () => clearInterval(id); }, [cb, ms]);
}
