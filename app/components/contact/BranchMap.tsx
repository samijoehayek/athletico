// app/components/contact/BranchMap.tsx
//
// Every branch pinned at once on an OpenStreetMap map (Leaflet). Selecting a
// branch — from the list or by tapping its pin — flies the map to it.

"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap, Marker } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Branch } from "@/lib/branches";

const pinIcon = (active: boolean) =>
  `<svg width="${active ? 40 : 32}" height="${active ? 50 : 40}" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 0C7.2 0 0 7 0 15.7 0 27.5 16 40 16 40s16-12.5 16-24.3C32 7 24.8 0 16 0z" fill="${active ? "#2B87C8" : "#0B3E80"}"/>
    <circle cx="16" cy="15.5" r="6" fill="#FFFFFF"/>
  </svg>`;

export default function BranchMap({
  branches,
  selectedId,
  onSelect,
}: {
  branches: Branch[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Map<string, Marker>>(new Map());
  const leafletRef = useRef<typeof import("leaflet") | null>(null);
  const onSelectRef = useRef(onSelect);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  // Build the map once. Leaflet touches `window`, so it loads client-side only.
  useEffect(() => {
    let cancelled = false;
    const markers = markersRef.current;

    import("leaflet").then((L) => {
      if (cancelled || !containerRef.current || mapRef.current) return;
      leafletRef.current = L;

      const map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
      });
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      branches.forEach((branch) => {
        const marker = L.marker([branch.lat, branch.lng], {
          title: branch.name,
          icon: L.divIcon({
            html: pinIcon(false),
            className: "",
            iconSize: [32, 40],
            iconAnchor: [16, 40],
          }),
        })
          .addTo(map)
          .on("click", () => onSelectRef.current(branch.id));
        markers.set(branch.id, marker);
      });

      map.fitBounds(
        L.latLngBounds(branches.map((b) => [b.lat, b.lng] as [number, number])),
        { padding: [40, 40] },
      );
      mapRef.current = map;
    });

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markers.clear();
    };
  }, [branches]);

  // Highlight and fly to the selected branch.
  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (!L || !map) return;

    markersRef.current.forEach((marker, id) => {
      const active = id === selectedId;
      marker.setIcon(
        L.divIcon({
          html: pinIcon(active),
          className: "",
          iconSize: active ? [40, 50] : [32, 40],
          iconAnchor: active ? [20, 50] : [16, 40],
        }),
      );
      marker.setZIndexOffset(active ? 1000 : 0);
    });

    const branch = branches.find((b) => b.id === selectedId);
    if (branch) map.flyTo([branch.lat, branch.lng], 15, { duration: 0.8 });
  }, [selectedId, branches]);

  // z-0 gives Leaflet's high z-index panes their own stacking context, so the
  // map never paints over the navbar or the mobile menu.
  return <div ref={containerRef} className="relative z-0 w-full h-full" aria-label="Map of Athletico branches" />;
}
