"use client";

import dynamic from "next/dynamic";

// Dynamically import Map so it runs ONLY in browser
const Map = dynamic(() => import("./ProjectMapInner"), {
  ssr: false,
});

export default function ProjectMap(props) {
  return <Map {...props} />;
}
